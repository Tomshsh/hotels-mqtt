import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MaintanenceService } from '@my-tray/data-services/api'
import { TowelsService } from '@my-tray/data-services/api'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private towelsService: TowelsService,
    private maintService: MaintanenceService
  ) { }

  @Get('hello')
  getData() {
    return this.appService.getData();
  }

  @Post('towels')
  drawTowels(@Body() { cardNum, quantity }: { cardNum: string, quantity: number }) {
    return this.towelsService.drawTowels(cardNum, quantity)
    .then(([locker, rt]) => {
      console.log(locker, rt)
    })
    .catch(err => {
      if(err.chore){
        this.maintService.doChore(err.chore)
      }
    })
  }
}
