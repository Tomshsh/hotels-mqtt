import { Injectable } from '@nestjs/common';
import Parse from 'parse'

@Injectable()
export class TowelsService {
  //todo: change return types after merge

  constructor() { }

  drawTowels(cardNum: string, quantity: number) {
    const q = new Parse.Query('RoomTowels')
    q.equalTo('cards', cardNum)
    return q.first()
      .then(rt => {
        const drawable = rt.get('towelLimit') - rt.get('currCount')
      if (!(drawable - quantity < 0)) {
          const q = new Parse.Query('Locker')
          q.greaterThan('quantity', quantity)
          return Promise.all([q.first(), rt])
        } else throw ({ message: 'maximum reached, you can only take ' + drawable + ' more'})
      })
      .then(([locker, rt]) => {
        if (locker) {
          locker.increment('quantity', -quantity)
          rt.increment('currCount', quantity)
          return Promise.all([rt.save(), locker.save()])
        }
        else throw ({message: 'no lockers meet this requirement', chore: 'refill lockers'})
      })
  }

}
