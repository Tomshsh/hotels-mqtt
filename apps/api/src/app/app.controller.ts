import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import Parse from 'parse/node'
import { StaffAlertService } from '@my-tray/data-services/api'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private staffAlertService: StaffAlertService
  ) { }

  @Get('hello')
  getData() {
    return this.staffAlertService.alertStaff('+972503028023')
    // return this.appService.getData();
  }

  @Post('towels')
  drawTowels(@Body() { cardNum, quantity }: { cardNum: string, quantity: number }) {
    const q = new Parse.Query('RoomTowels')
    q.equalTo('cards', cardNum)
    return q.first()
      .then(rt => {
        if (!(rt.get('towelLimit') - rt.get('currCount') - quantity < 0)) {
          const q = new Parse.Query('Locker')
          q.greaterThan('quantity', quantity)
          return Promise.all([q.first(), rt])
        } else throw ({ message: 'reached limit for guest'})
      })
      .then(([locker, rt]) => {
        if (locker) {
          locker.increment('quantity', -quantity),
            rt.increment('currCount', quantity)
          return Promise.all([
            rt.save(),
            locker.save()
          ])
        } else throw ({
          message: 'no lockers met quantity requirements',
          action: () => {
            const q = new Parse.Query('Maintenance')
            q.equalTo('chores', 'refill lockers')
            q.equalTo('onShift', true)
            q.find()
          }
        })
      })
      .then(([rt, locker]) => ({ rt, locker }))
      .catch((err) => {
        console.log(err.message)

      })
  }
}
