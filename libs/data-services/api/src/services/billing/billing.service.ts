import { RmqService } from '@my-tray/shared/backend/rmq';
import { Injectable } from '@nestjs/common';
import { LockersService } from '../lockers';

@Injectable()
export class BillingService {

  constructor(
    private lockersService: LockersService,
    private rmqService: RmqService
  ) { };

  charge(qty, guest) {
    const amount = qty * this.lockersService.chargeTariff;
    this.rmqService.publishToDefaultQueue('charge', { amount, roomNo: guest.room.name, desc: qty + 'xTOWELS' }, 'direct_billing')
  }

  refund(qty, guest) {
    const amount = qty * this.lockersService.refundTariff;
    this.rmqService.publishToDefaultQueue('refund', { amount, roomNo: guest.room.name, desc: qty + 'xTOWELS' }, 'direct_billing')
  }



}
