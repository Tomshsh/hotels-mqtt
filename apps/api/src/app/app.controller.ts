import { Controller } from '@nestjs/common';
import { TowelsService, BillingService, HousekeepingService, LockersService } from '@my-tray/data-services/api';
import { Chore } from '@my-tray/api-interfaces';
import { MessagePattern, Payload, Ctx, MqttContext } from '@nestjs/microservices'
import { MinibarsService } from 'libs/data-services/api/src/services/minibars';

@Controller()
export class AppController {

  constructor(
    private towelsService: TowelsService,
    private billingService: BillingService,
    private hkService: HousekeepingService,
    private lockersService: LockersService,
    private minibarService: MinibarsService
  ) { }

  @MessagePattern(`+/+/item/put`)
  async returnProducts(@Payload() { itemQty, cardId, itemType, roomId }, @Ctx() context: MqttContext) {
    const [hotelId, deviceId] = context.getTopic().split('/')
    itemType == "towels"
      ? this.returnTowels(cardId, itemQty, deviceId)
      : this.returnToMinibar(deviceId, itemType)
  }

  @MessagePattern(`+/+/item/get`)  //todo: change "main" to base topic depending on hotel
  async takeProducts(@Payload() { cardId, itemQty, itemType, roomId }, @Ctx() context: MqttContext) {
    const [hotelId, deviceId] = context.getTopic().split('/')
    itemType == "towels"
      ? this.takeTowels(cardId, deviceId, itemQty)
      : this.takeFromMinibar(deviceId, itemType)
  }

  @MessagePattern(`+/+/refill`)
  async refillTowels(@Payload() { currentQty, itemType }, @Ctx() context: MqttContext) {
    const [hotelId, deviceId] = context.getTopic().split('/')
    try {
      await this.lockersService.refillTowels(currentQty, deviceId)
    } catch (err) {
      console.error('controller error', err)
    }
  }

  @MessagePattern(`+/+/bin_clear`)
  async clearBin(@Payload() { currentQty, itemType }, @Ctx() context: MqttContext) {
    const [hotelId, deviceId] = context.getTopic().split('/')
    try {
      await this.lockersService.clearBin(deviceId)
    } catch (err) {
      console.error('controller error', err)
    }
  }

  @MessagePattern(`+/+/lwt`)
  handleProblem(@Payload() msg: Chore, @Ctx() context: MqttContext) {
    const [hotelId, deviceId] = context.getTopic().split('/')
    this.hkService.doChore(Chore[msg])
  }

  private async takeTowels(cardId, deviceId, itemQty) {
    try {
      const [rt] = await this.towelsService.drawTowels(cardId, itemQty, deviceId);
      this.billingService.charge('towels', itemQty, rt.get('room').get('num'));
      // what's that for?
      // const drawable = rt.get('towelLimit') - rt.get('currCount');
      // return { drawable };
    }
    catch (err) {
      console.error('[towels procedure]', err);
    }
  }

  private async takeFromMinibar(deviceId, itemType) {
    try {
      const minibar = await this.minibarService.get(deviceId, itemType);
      this.billingService.charge(itemType, 1, minibar.get('room').get('num'));
    }
    catch (err) {
      console.error('[minibar procedure]', err)
    }
  }

  private async returnTowels(cardId, itemQty, deviceId) {
    try {
      const [rt] = await this.towelsService.returnTowels(cardId, itemQty, deviceId)
      this.billingService.refund('towels', itemQty, rt.get('room').get('name'))
    }
    catch (err) {
      console.error('[towel error]', err.message)
    }
  }

  private async returnToMinibar(deviceId, itemType) {
    try {
      const minibar = await this.minibarService.put(deviceId, itemType)
      this.billingService.refund(itemType, 1, minibar.get('room').get('num'))
    }
    catch (err) {
      console.error('[minibar procedure]', err.message)
    }
  }

}
