import { Injectable, HttpService } from '@nestjs/common';
import { LockersService } from '../lockers';

@Injectable()
export class BillingService {

  constructor(
    private httpService: HttpService,
    private lockersService: LockersService
  ) { };

  private chargeRoute: string;
  private refundRoute: string;

  defineRoutes(env) {
    this.chargeRoute = env.billing.chargeRoute;
    this.refundRoute = env.billing.refundRoute;
  }

  charge(qty, guest) {
    const amount = qty * this.lockersService.chargeTariff;
    this.httpService.post(this.chargeRoute, { amount, roomNo: guest.room.name, desc: qty + 'xTOWELS' })
      .subscribe(
        res => { console.log(res.data) },
        err => { throw ({message: 'billing error ' + err}) }
      );
  }

  refund(qty, guest) {
    const amount = qty * this.lockersService.refundTariff;
    this.httpService.post(this.refundRoute, { amount, roomNo: guest.room.name, desc: qty + 'xTOWELS' })
      .subscribe(
        res => { console.log(res.data) },
        err => { throw ({message: 'billing error ' + err}) }
      );
  }



}
