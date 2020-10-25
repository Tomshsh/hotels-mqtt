import { RmqService } from '@my-tray/shared/backend/rmq';
import { Injectable } from '@nestjs/common';
import { LockersService } from '../lockers';

@Injectable()
export class BillingService {

  constructor(
    private lockersService: LockersService,
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
      this.pad(today.getSeconds()) + "" +
      this.pad(today.getMilliseconds())
    )
  }

  charge(qty, roomNo) {
    const amount = qty * this.lockersService.chargeTariff;
    const time = this.getTime()
    this.rmqService.publish('towel_billing', 'charge', { amount, roomNo, time, desc: 'TOWELSx' + qty })
  }

  refund(qty, roomNo) {
    const amount = qty * this.lockersService.refundTariff;
    const time = this.getTime()
    this.rmqService.publish('towel_billing', 'refund', { amount, roomNo, time, desc: 'TOWELSx' + qty })
  }



}
