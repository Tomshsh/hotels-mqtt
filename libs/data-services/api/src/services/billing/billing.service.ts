import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class BillingService {

  constructor(private httpService: HttpService) { };

  private chargeRoute: string;
  private refundRoute: string;

  defineRoutes(env) {
    this.chargeRoute = env.billing.chargeRoute
    this.refundRoute = env.billing.refundRoute
  }

  charge(amount, guest){
    this.httpService.post(this.chargeRoute, {amount, guest})
    //todo: body= {roomNo, amount, desc("3xTOWELS")}
    .subscribe(res => {console.log(res)})
  }

  refund(amount, guest){
    this.httpService.post(this.refundRoute, {amount, guest})
    //todo: body= {roomNo, amount, desc("3xTOWELS")}
    .subscribe(res => {console.log(res)})
  }



}
