import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { TowelsService } from '@my-tray/data-services/api'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private towelsService: TowelsService,
  ) { }

  @Get('hello')
  getData() {
    return this.appService.getData();
  }

  @Post('draw-towels')
  async drawTowels(@Body() { cardNum, quantity }: { cardNum: string, quantity: number }) {
    try {
      const [rt] = await this.towelsService.drawTowels(cardNum, quantity);
    }
    catch (err) {
      console.error(err.message);
    }
  }

  @Post('return-towels')
  async returnTowels(@Body() {cardNum, quantity}: { cardNum: string, quantity: number }){
    try{
      const [rt] = await this.towelsService.returnTowels(cardNum, quantity)
    }
    catch (err) {
      console.error(err.message)
    }
  }
}
