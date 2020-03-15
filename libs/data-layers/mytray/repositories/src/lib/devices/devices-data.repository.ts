import { Injectable } from '@angular/core';
import * as Parse from 'parse';


@Injectable({ providedIn: 'root' })
export class DevicesDataRepository {

  constructor() {
  }

  async getDevices() {
    return await new Parse
      .Query(Parse.Object.extend('Device'))
      .find().then((results) => {
        return results;
      });
  }
}
