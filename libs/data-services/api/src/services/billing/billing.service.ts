import { RmqService } from '@my-tray/shared/backend/rmq';
import { Injectable } from '@nestjs/common';
import { LockersService } from '../lockers';

@Injectable()
export class BillingService {

  constructor(
    private lockersService: LockersService,
    private rmqService: RmqService
  ) { };

  charge(qty, roomNo) {
    const amount = qty * this.lockersService.chargeTariff;
    this.rmqService.publish('direct_billing', 'charge', { amount, roomNo, desc: 'TOWELSx' + qty })
  }

  refund(qty, roomNo) {
    const amount = qty * this.lockersService.refundTariff;
    this.rmqService.publish('direct_billing', 'refund', { amount, roomNo, desc: 'TOWELSx' + qty })
  }



}
