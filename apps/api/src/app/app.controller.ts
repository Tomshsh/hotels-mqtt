import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import Parse from 'parse/node'
import {StaffAlertService} from '@my-tray/data-services/api'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private staffAlertService: StaffAlertService
    ) {}

  @Get('hello')
  getData(){
    return this.appService.getData();
  }

  @Post('towels')
  drawTowels(@Body() {cardNum, quantity}: {cardNum: string, quantity: number} ){
    const q = new Parse.Query('RoomTowels')
    q.equalTo('cards', cardNum)
    return q.first()
    .then(rt => {
      if(!(rt.get('towelLimit') - rt.get('currCount') - quantity < 0)){
        const q = new Parse.Query('Locker')
        q.greaterThan('quantity', quantity)
        return Promise.all([q.first(), rt])
      }else throw('dsdssd')
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
    .then(([rt, locker]) => ({rt, locker}))
    .catch((err) => console.log("err"))
  }
}
