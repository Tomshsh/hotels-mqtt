import { Injectable } from '@nestjs/common';
import Parse from 'parse/node'
import { LockersService } from '../lockers';
import { ConfigurationService } from '@my-tray/shared/backend';

@Injectable()
export class TowelsService {
  //todo: change return types after merge

  constructor(
    private lokcerService: LockersService,
    private configService: ConfigurationService
  ) { }

  private getRt(cardNum: string) {
    const q = new Parse.Query('RoomTowels');
    q.equalTo('cards', cardNum);
    return q.first({ sessionToken: this.configService.user.getSessionToken() });
  }

  async drawTowels(cardNum: string, quantity: number, deviceId: string) {
    const rt = await this.getRt(cardNum);
    const drawable = rt.get('towelLimit') - rt.get('currCount');
    if (!(drawable - quantity < 0)) {
      rt.increment('currCount', quantity);
      return Promise.all([
        rt.save(null, { sessionToken: this.configService.user.getSessionToken() }),
        this.lokcerService.drawTowels(quantity, deviceId)
      ]);
    }
    else
      throw ({ message: 'maximum reached, you can only take ' + drawable + ' more' });
  }

  async returnTowels(cardNum: string, quantity: number, deviceId: string) {
    const rt = await this.getRt(cardNum);
    rt.increment('currCount', -quantity);
    return Promise.all([
      rt.save(null, { sessionToken: this.configService.user.getSessionToken() }),
      this.lokcerService.returnTowels(quantity, deviceId)
    ]);
  }

}
