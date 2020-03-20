import { Injectable } from '@angular/core';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class RoutesDataRepository {

  constructor() {
  }

  async getRoutes(): Promise<any> {
    const query = new Parse
      .Query(Parse.Object.extend('Menu'));
    return await query.descending('order').find();
  }
}
