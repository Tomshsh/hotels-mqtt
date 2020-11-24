import { RmqService } from '@my-tray/shared/backend/rmq';
import { Injectable } from '@nestjs/common';
import { LockersService } from '../lockers';
import { MinibarsService } from '../minibars';

interface publishVars {
  exchange: 'towel_billing' | 'minibar_billing'
  amount: number
  desc: string
}

@Injectable()
export class BillingService {

  constructor(
    private lockersService: LockersService,
    private minibarsService: MinibarsService,
    private rmqService: RmqService
  ) { };

  private pad(n) {
    return n < 10 ? '0' + n : n;
  }

  private getTime() {
    const today = new Date();
    return (
      this.pad(today.getHours()) + "" +
      this.pad(today.getMinutes()) + "" +
      this.pad(today.getSeconds())
    )
  }

  async initVars(itemType: string, qty: number): Promise<publishVars> {
    return itemType == 'towel'
      ? { exchange: 'towel_billing', amount: qty * this.lockersService.chargeTariff, desc: 'TOWELSx' + qty }
      : { exchange: 'minibar_billing', amount: (await this.minibarsService.findProductPrice(itemType)), desc: itemType }
  }

  async charge(itemType: string, qty: number, roomNo, deviceId: string) {
    const time = this.getTime()
    const { exchange, amount, desc } = await this.initVars(itemType, qty)
    this.rmqService.publish(exchange, 'charge', { amount, roomNo, time, desc, deviceId })
  }

  async refund(itemType: string, qty: number, roomNo, deviceId: string) {
    const time = this.getTime()
    const { exchange, amount, desc } = await this.initVars(itemType, qty)
    this.rmqService.publish(exchange, 'refund', { amount: -1 * amount, roomNo, time, desc, deviceId })
  }

}