import { Injectable } from '@nestjs/common';
import Parse from 'parse/node'
import { MaintanenceService } from '../maintanence';
import { Chore } from '@my-tray/api-interfaces';


@Injectable()
export class LockersService {

  constructor(
    private maintService: MaintanenceService
  ) { }

  readonly minPercent = 0.2;
  readonly maxBinCap = 30;

  private checkForMaint(condition: boolean, chore: Chore) {
    condition && this.maintService.doChore(chore)
  }

  async drawTowels(quantity: number) {
    const q = new Parse.Query('Locker');
    let locker = await q.first();
    locker.increment('quantity', -quantity);
    locker = await locker.save();
    this.checkForMaint(
      locker.get('quantity') / locker.get('capacity') < this.minPercent,
      Chore.REFILL_LOCKER
    )
  }

  async returnTowels(quantity: number) {
    const q = new Parse.Query('Locker');
    let locker = await q.first();
    locker.increment('bin', quantity);
    locker = await locker.save();
    this.checkForMaint(
      locker.get('bin') > this.maxBinCap,
      Chore.REPLACE_BIN
    )
  }

}
