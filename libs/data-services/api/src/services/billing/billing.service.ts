import { Injectable, HttpService } from '@nestjs/common';
import { throwError } from 'rxjs';
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
    const amountObserver = {
      next(res) {
        console.log('next: ' + res);
      },
      error(err) {
        console.log('charge err', err.message)
        throwError(new Error('oops!'))
      },
      complete() {
        console.log('complete')
      }
    };
    try{
      this.httpService.post(this.chargeRoute, { amount, roomNo: guest.room.name, desc: qty + 'xTOWELS' })
        .subscribe(amountObserver);
    }catch (err){
      console.log('err form catch')
      throwError(new Error('oops!'))
    }
  }

  refund(qty, guest) {
    const amount = qty * this.lockersService.refundTariff;
    const amountObserver = {
      next(res) {
        console.log('next: ' + res);
      },
      error(err) {
        console.log('charge err', err.message)
        throwError(new Error('oops!'))
      },
      complete() {
        console.log('complete')
      }
    };
    this.httpService.post(this.refundRoute, { amount, roomNo: guest.room.name, desc: qty + 'xTOWELS' })
      .subscribe(amountObserver);
  }



}
