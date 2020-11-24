import { Injectable } from '@nestjs/common';
import Parse from 'parse/node'
import { LockersService } from '../lockers';
import { ConfigurationService } from '@my-tray/shared/backend';

@Injectable()
export class TowelsService {
  //todo: change return types after merge

  constructor(
    private lockerService: LockersService,
    private configService: ConfigurationService
  ) { }

  private getRt(cardNum: string) {
    const q = new Parse.Query('RoomTowels');
    q.equalTo('cards', cardNum);
    q.include('room')
    return q.first({ sessionToken: this.configService.user.getSessionToken() });
  }

  async unknownCard(cardId){
    const q = new Parse.Query('Room')
    q.equalTo('name', 'unknown')
    const room = await q.first({sessionToken: this.configService.user.getSessionToken()})
    const obj = new Parse.Object('RoomTowels')
    obj.add('cards', cardId)
    obj.set('room', room)
    obj.setACL(room.getACL())
    return obj.save(null, {sessionToken: this.configService.user.getSessionToken()})
  }

  async drawTowels(cardNum: string, quantity: number, deviceId: string) {
    let rt = await this.getRt(cardNum);
    if(!rt){
      rt = await this.unknownCard(cardNum)
    }
    /*
    const drawable = rt.get('towelLimit') - rt.get('currCount');
    if (!(drawable - quantity < 0)) {
     */
    rt.increment('currCount', quantity);
    return Promise.all([
        rt.save(null, { sessionToken: this.configService.user.getSessionToken() }),
        this.lockerService.drawTowels(quantity, deviceId)
      ]);
      /*
    }
    else
    todo: in the future message needs to be sent to locker, instead of thrown
         throw ({ message: 'maximum reached, you can only take ' + drawable + ' more' });
       */
  }

  async returnTowels(cardNum: string, quantity: number, deviceId: string) {
    let rt = await this.getRt(cardNum);
    if(!rt){
      rt = await this.unknownCard(cardNum)
    }
    rt.increment('currCount', -quantity);
    return Promise.all([
      rt.save(null, { sessionToken: this.configService.user.getSessionToken() }),
      this.lockerService.returnTowels(quantity, deviceId)
    ]);
  }

}
