import { Injectable } from '@nestjs/common';
import Parse from 'parse/node'
import { LockersService } from '../lockers';

@Injectable()
export class TowelsService {
  //todo: change return types after merge

  constructor(private lokcerService: LockersService) { }

  private getRt(cardNum: string) {
    const q = new Parse.Query('RoomTowels');
    q.equalTo('cards', cardNum);
    return q.first()
  }

  async drawTowels(cardNum: string, quantity: number) {
    const rt = await this.getRt(cardNum);
    const drawable = rt.get('towelLimit') - rt.get('currCount');
    if (!(drawable - quantity < 0)) {
      rt.increment('currCount', quantity);
      return Promise.all([
        rt.save(),
        this.lokcerService.drawTowels(quantity)
      ]);
    }
    else
      throw ({ message: 'maximum reached, you can only take ' + drawable + ' more' });
  }

  async returnTowels(cardNum: string, quantity: number) {
    const rt = await this.getRt(cardNum);
    rt.increment('currCount', -quantity);
    return Promise.all([
      rt.save(),
      this.lokcerService.returnTowels(quantity)
    ]);
  }

}
