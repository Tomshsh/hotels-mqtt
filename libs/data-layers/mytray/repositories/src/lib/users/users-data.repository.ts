import { Injectable } from '@angular/core';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class UsersDataRepository {

  // todo: logging aggregator
  constructor() { }

  async getUsers() {
    return await new Parse.Query(Parse.User).find();
  }
}
