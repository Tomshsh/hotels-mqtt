import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { LiveQuerySubscription } from 'parse';

@Injectable({ providedIn: 'root' })
export class DevicesDataRepository {
  private liveQuerySubscription: LiveQuerySubscription;

  constructor() {
  }

  async liveQuery() {
    const query = new Parse
      .Query(Parse.Object.extend('Device'));
    this.liveQuerySubscription = await query.subscribe();
    return this.liveQuerySubscription;
  }


  async getDevices() {
    return await new Parse
      .Query(Parse.Object.extend('Device'))
      .find().then((results) => {
        return results;
      });
  }

  async unsubscribe() {
    this.liveQuerySubscription.unsubscribe();
  }
}
