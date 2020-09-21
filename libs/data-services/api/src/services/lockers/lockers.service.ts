import { Injectable } from '@nestjs/common';
import Parse from 'parse/node'
import { MaintanenceService } from '../maintanence';
import { Chore } from '@my-tray/api-interfaces';
import { ConfigurationService } from '@my-tray/shared/backend';


@Injectable()
export class LockersService {

  constructor(
    private maintService: MaintanenceService,
    private configService: ConfigurationService
  ) { }

  refundTariff: number;
  chargeTariff: number;
  readonly minPercent = 0.2;

  private checkForMaint(condition: boolean, chore: Chore) {
    console.log(condition)
    condition && this.maintService.doChore(chore)
  }

  private async findLocker(deviceId: string) {
    const q = new Parse.Query('Locker');
    q.equalTo('deviceId', deviceId);
    const locker = await q.first({ sessionToken: this.configService.user.getSessionToken() });
    this.refundTariff = locker.get('refundTariff')
    this.chargeTariff = locker.get('chargeTariff')
    return locker
  }

  async drawTowels(quantity: number, deviceId: string) {
    let locker = await this.findLocker(deviceId);
    locker.increment('quantity', -quantity);
    locker = await locker.save(null, { sessionToken: this.configService.user.getSessionToken() });
    this.checkForMaint(
      locker.get('quantity') < locker.get('capacity') * this.minPercent,
      Chore.REFILL_LOCKER
    )
  }

  async returnTowels(quantity: number, deviceId: string) {
    let locker = await this.findLocker(deviceId);
    locker.increment('binQty', quantity);
    locker = await locker.save(null, { sessionToken: this.configService.user.getSessionToken() });
    this.checkForMaint(
      locker.get('binQty') > locker.get('binCapacity') * 0.75,
      Chore.REPLACE_BIN
    )
  }

}
