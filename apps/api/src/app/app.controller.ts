import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { TowelsService, BillingService } from '@my-tray/data-services/api'
import Parse from 'parse'
import { UserService } from '@my-tray/shared/backend/user';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private towelsService: TowelsService,
    private billingService: BillingService,
    private userService: UserService
  ) { }

  @Get('hello')
  getData() {
    return this.appService.getData();
  }

  @Post('draw-towels')
  async drawTowels(@Body() { cardNum, quantity }: { cardNum: string, quantity: number }) {
    console.log(this.userService.user)
    try {
      const [rt] = await this.towelsService.drawTowels(cardNum, quantity);
      const drawable = rt.get('towelLimit') - rt.get('currCount');
      this.billingService.charge(500, rt.attributes)
      return {drawable};
    }
    catch (err) {
      console.error(err.message);
    }
  }

  @Post('return-towels')
  async returnTowels(@Body() {cardNum, quantity}: { cardNum: string, quantity: number }){
    try{
      const [rt] = await this.towelsService.returnTowels(cardNum, quantity)
      this.billingService.refund(500, rt.attributes)
    }
    catch (err) {
      console.error(err.message)
    }
  }
}
