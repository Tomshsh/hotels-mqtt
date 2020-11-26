import { Injectable } from '@nestjs/common';
import { LockersService } from '../lockers';
import { MinibarsService } from '../minibars';
import { TransactionsService } from '../transactions/transactions.service';

interface publishVars {
  amount: number
  description: string
}

@Injectable()
export class BillingService {

  constructor(
    private lockersService: LockersService,
    private minibarsService: MinibarsService,
    private transactionsService: TransactionsService
  ) { };

  private pad(n) {
    return n < 10 ? '0' + n : n;
  }

  private getTime() {
    const today = new Date();
    return (
      this.pad(today.getHours()) + "" +
      this.pad(today.getMinutes()) + "" +
      this.pad(today.getSeconds())
    )
  }

  async initVars(itemType: string, qty: number): Promise<publishVars> {
    return itemType == 'towel'
      ? { amount: qty * this.lockersService.chargeTariff, description: 'TOWELSx' + qty }
      : { amount: (await this.minibarsService.findProductPrice(itemType)), description: itemType }
  }

  async charge(action: 'charge' | 'refund', itemType: string, qty: number, roomNo, deviceId: string, acl: Parse.ACL) {
    const time = this.getTime()
    const { amount, description } = await this.initVars(itemType, qty)
    this.transactionsService.create({
      status: 'pending',
      serial: (Number(time) + 100000).toString(),
      amount: action == 'refund' ? -1 * amount : amount,
      action, description, deviceId, roomNo
    }, acl)
  }

}