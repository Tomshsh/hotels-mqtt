import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import Parse from 'parse/node'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(){
    return this.appService.getData();
  }

  @Post('towels')
  drawTowels(@Body() {cardNum, quantity}: {cardNum: string, quantity: number} ){
    const q = new Parse.Query('RoomTowels')
    q.equalTo('cards', cardNum)
    q.first()
    .then(rt => {
      if(!(rt.get('towelLimit') - rt.get('currCount') - quantity < 0)){
        const q = new Parse.Query('Locker')
        q.greaterThan('quantity', quantity)
        return Promise.all([q.first(), rt])
      }
    })
    .then(([locker, rt]) => {
      if(locker){
        locker.increment('quantity',-quantity),
        rt.increment('currCount',quantity)
        return Promise.all([
          rt.save(),
          locker.save()
        ])
      }
    })
    .then(() => {})
    .catch((err) => console.log("err"))
  }
}
