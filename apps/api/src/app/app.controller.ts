import { Controller } from '@nestjs/common';
import { TowelsService, BillingService, HousekeepingService, LockersService, LoggingService, MinibarsService } from '@my-tray/data-services/api';
import { Chore } from '@my-tray/api-interfaces';
import { MessagePattern, Payload, Ctx, MqttContext } from '@nestjs/microservices'

@Controller()
export class AppController {

  constructor(
    private towelsService: TowelsService,
    private billingService: BillingService,
    private hkService: HousekeepingService,
    private lockersService: LockersService,
    private minibarService: MinibarsService,
    private logService: LoggingService
  ) { }

  @MessagePattern(`+/+/item/put`)
  async returnProducts(@Payload() { itemQty, cardId, itemType, roomId }, @Ctx() context: MqttContext) {
    const [hotelId, deviceId] = context.getTopic().split('/')
    itemType == "towel"
      ? this.returnTowels(cardId, itemQty, deviceId)
      : this.returnToMinibar(deviceId, itemType)
  }

  @MessagePattern(`+/+/item/get`)  //todo: change "main" to base topic depending on hotel
  async takeProducts(@Payload() msg, @Ctx() context: MqttContext) {
    const { cardId, itemQty, itemType, roomId } = msg
    console.log(msg)
    const [hotelId, deviceId] = context.getTopic().split('/')
    itemType == "towel"
      ? this.takeTowels(cardId, deviceId, itemQty)
      : this.takeFromMinibar(deviceId, itemType)
  }

  @MessagePattern(`+/+/refill`)
  async refillTowels(@Payload() { currentQty, itemType }, @Ctx() context: MqttContext) {
    const [hotelId, deviceId] = context.getTopic().split('/')
    this.logService.log(`locker ${deviceId} was refilled`)
    try {
      await this.lockersService.refillTowels(currentQty, deviceId)
    } catch (err) {
      console.error('controller error', err)
    }
  }

  @MessagePattern(`+/+/bin_clear`)
  async clearBin(@Payload() { currentQty, itemType }, @Ctx() context: MqttContext) {
    const [hotelId, deviceId] = context.getTopic().split('/')
    this.logService.log(`bin ${deviceId} was cleared`)
    try {
      await this.lockersService.clearBin(deviceId)
    } catch (err) {
      console.error('controller error', err)
    }
  }

  @MessagePattern(`+/+/lwt`)
  handleProblem(@Payload() msg: Chore, @Ctx() context: MqttContext) {
    const [hotelId, deviceId] = context.getTopic().split('/')
    this.logService.log(`lost communication with device ${deviceId}`)
    this.hkService.doChore(Chore[msg])
  }

  private async takeTowels(cardId, deviceId, itemQty) {
    this.logService.log(`${itemQty.length > 1 ? "1 towel was" : itemQty + " towels were"} removed from locker ${deviceId} using card ${cardId}`)
    try {
      const [rt] = await this.towelsService.drawTowels(cardId, itemQty, deviceId);
      this.billingService.charge('towel', itemQty, rt.get('room').get('num'));
      // what's that for?
      // const drawable = rt.get('towelLimit') - rt.get('currCount');
      // return { drawable };
    }
    catch (err) {
      console.error('[towels procedure]', err);
    }
  }

  private async takeFromMinibar(deviceId, itemType) {
    this.logService.log(`${itemType} was removed from device ${deviceId}`)
    try {
      const minibar = await this.minibarService.get(deviceId, itemType);
      this.billingService.charge(itemType, 1, minibar.get('room').get('num'));
    }
    catch (err) {
      console.error('[minibar procedure]', err)
    }
  }

  private async returnTowels(cardId, itemQty, deviceId) {
    this.logService.log(`${itemQty} towels were returned to locker ${deviceId} using card ${cardId}`)
    try {
      const [rt] = await this.towelsService.returnTowels(cardId, itemQty, deviceId)
      this.billingService.refund('towel', itemQty, rt.get('room').get('num'))
    }
    catch (err) {
      console.error('[towel error]', err.message)
    }
  }

  private async returnToMinibar(deviceId, itemType) {
    this.logService.log(`${itemType} was put in minibar ${deviceId}`)
    try {
      const minibar = await this.minibarService.put(deviceId, itemType)
      this.billingService.refund(itemType, 1, minibar.get('room').get('num'))
    }
    catch (err) {
      console.error('[minibar procedure]', err.message)
    }
  }

}
