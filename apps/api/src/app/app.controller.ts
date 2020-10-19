import { Controller } from '@nestjs/common';
import { TowelsService, BillingService, MaintanenceService } from '@my-tray/data-services/api';
import { Chore } from '@my-tray/api-interfaces';
import { MessagePattern, Payload, Ctx, MqttContext } from '@nestjs/microservices'
import { environment } from '../environments';

@Controller()
export class AppController {

  constructor(
    private towelsService: TowelsService,
    private billingService: BillingService,
    private maintService: MaintanenceService,
  ) {}

  @MessagePattern(`${environment.mqtt.main}/+/item/put`)
  async drawTowels(@Payload() {itemQty, cardId}, @Ctx() context: MqttContext) {
    const [hotelId, deviceId] = context.getTopic().split('/')
    console.log(itemQty, cardId, deviceId)
    try {
      const [rt] = await this.towelsService.returnTowels(cardId, itemQty, deviceId)
      this.billingService.refund(itemQty, rt.get('room').get('name'))
    }
    catch (err) {
      console.error('controller error',err.message)
    }
  }

  @MessagePattern(`${environment.mqtt.main}/+/item/get`)  //todo: change "main" to base topic depending on hotel
  async returnTowels(@Payload() {cardId, itemQty}, @Ctx() context: MqttContext) {
    const [hotelId, deviceId] = context.getTopic().split('/')
    console.log(deviceId, cardId, itemQty)
    try {
      const [rt] = await this.towelsService.drawTowels(cardId, itemQty, deviceId);
      const drawable = rt.get('towelLimit') - rt.get('currCount');
      this.billingService.charge(itemQty, rt.get('room').get('num'))
      return { drawable };
    }
    catch (err) {
      console.error('controller error',err);
    }
  }

  @MessagePattern(`${environment.mqtt.main}/+/lwt`)
  handleProblem(@Payload() msg: Chore, @Ctx() context: MqttContext) {
    const [hotelId, deviceId] = context.getTopic().split('/')
      this.maintService.doChore(Chore[msg])
  }


}
