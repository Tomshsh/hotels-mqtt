import { Controller } from '@nestjs/common';
import { TowelsService, BillingService, HousekeepingService, LockersService, LoggingService, MinibarsService } from '@my-tray/data-services/api';
import { Chore } from '@my-tray/api-interfaces';
import { MessagePattern, Payload, Ctx, MqttContext } from '@nestjs/microservices'
import { ConfigurationService } from '@my-tray/shared/backend';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(
    private towelsService: TowelsService,
    private billingService: BillingService,
    private hkService: HousekeepingService,
    private lockersService: LockersService,
    private minibarService: MinibarsService,
    private logService: LoggingService,
    private appService: AppService
  ) { }

  @MessagePattern(`+/+/item/put`)
  async returnProducts(@Payload() { itemQty, cardId, itemType, roomId }, @Ctx() context: MqttContext) {
    const [hotelId, deviceId] = context.getTopic().split('/')
    try {
      const device = await this.appService.findDevice(deviceId)
      switch (device.className) {
        case 'Minibar':
          this.returnToMinibar(deviceId, itemType, hotelId)
          break;
        case 'Locker':
          this.returnTowels(cardId, itemQty, deviceId, hotelId)
          break;
        case 'Tray':
          break;
      }
    } catch (err) { }
  }

  @MessagePattern(`+/+/item/get`)
  async takeProducts(@Payload() msg, @Ctx() context: MqttContext) {

    let newMsg;
    if(typeof msg == "string"){
      newMsg = {}
      const extracted = msg.match(/\w+/g)
      extracted.map((w, i)=> {
        if(i%2 == 0) newMsg[w] =  extracted[i+1]
      })
    }
    else newMsg = msg

    console.log(newMsg)

    const { cardId, itemQty, itemType, roomId } = newMsg

    const [hotelBaseTopic, deviceId] = context.getTopic().split('/')
    try {
      const device = await this.appService.findDevice(deviceId)
      switch (device.className) {
        case 'Minibar':
          this.takeFromMinibar(deviceId, itemType, hotelBaseTopic)
          break;
        case 'Locker':
          this.takeTowels(cardId, deviceId, itemQty, hotelBaseTopic)
          break;
        case 'Tray':
          break;
      }
    } catch (err) { }
  }

  @MessagePattern(`+/+/refill`)
  async refillTowels(@Payload() { currentQty, itemType }, @Ctx() context: MqttContext) {
    const [hotelId, deviceId] = context.getTopic().split('/')
    const acl = await this.appService.getHotelAcl(hotelId)
    this.logService.log(`locker ${deviceId} was refilled`, acl)
    try {
      await this.lockersService.refillTowels(currentQty, deviceId)
    } catch (err) {
      console.error('controller error', err)
    }
  }

  @MessagePattern(`+/+/bin_clear`)
  async clearBin(@Payload() { currentQty, itemType }, @Ctx() context: MqttContext) {
    const [hotelId, deviceId] = context.getTopic().split('/')
    const acl = await this.appService.getHotelAcl(hotelId)
    this.logService.log(`bin ${deviceId} was cleared`, acl)
    try {
      await this.lockersService.clearBin(deviceId)
    } catch (err) {
      console.error('controller error', err)
    }
  }

  @MessagePattern(`+/+/lwt`)
  async handleProblem(@Payload() msg: Chore, @Ctx() context: MqttContext) {
    const [hotelId, deviceId] = context.getTopic().split('/')
    const acl = await this.appService.getHotelAcl(hotelId)
    this.logService.log(`lost communication with device ${deviceId}`, acl)
    this.hkService.doChore(Chore[msg])
  }

  private async takeTowels(cardId, deviceId, itemQty, hotelId) {
    const acl = await this.appService.getHotelAcl(hotelId)
    this.logService.log(`${itemQty.length > 1 ? "1 towel was" : itemQty + " towels were"} removed from locker ${deviceId} using card ${cardId}`, acl)
    try {
      const [rt] = await this.towelsService.drawTowels(cardId, itemQty, deviceId);
      this.billingService.charge('charge', 'towel', itemQty, rt.get('room').get('num'), deviceId, rt.getACL());
      // what's that for?
      // const drawable = rt.get('towelLimit') - rt.get('currCount');
      // return { drawable };
    }
    catch (err) {
      console.error('[towels procedure]', err);
    }
  }

  private async takeFromMinibar(deviceId, itemType, hotelId) {
    const acl = await this.appService.getHotelAcl(hotelId)
    this.logService.log(`${itemType} was removed from device ${deviceId}`, acl)
    try {
      const minibar = await this.minibarService.get(deviceId, itemType);
      this.billingService.charge('charge', itemType, 1, minibar.get('room').get('num'), deviceId, minibar.getACL());
    }
    catch (err) {
      console.error('[minibar procedure]', err)
    }
  }

  private async returnTowels(cardId, itemQty, deviceId, hotelId) {
    const acl = await this.appService.getHotelAcl(hotelId)
    this.logService.log(`${itemQty} towels were returned to locker ${deviceId} using card ${cardId}`, acl)
    try {
      const [rt] = await this.towelsService.returnTowels(cardId, itemQty, deviceId)
      this.billingService.charge('refund', 'towel', itemQty, rt.get('room').get('num'), deviceId, rt.getACL())
    }
    catch (err) {
      console.error('[towel error]', err.message)
    }
  }

  private async returnToMinibar(deviceId, itemType, hotelId) {
    const acl = await this.appService.getHotelAcl(hotelId)
    this.logService.log(`${itemType} was put in minibar ${deviceId}`, acl)
    try {
      const minibar = await this.minibarService.put(deviceId, itemType)
      // this.billingService.refund(itemType, 1, minibar.get('room').get('num'), deviceId)
    }
    catch (err) {
      console.error('[minibar procedure]', err.message)
    }
  }

}
