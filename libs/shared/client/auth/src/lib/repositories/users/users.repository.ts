import { Injectable } from '@angular/core';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class UsersRepository {
  constructor() {
  }

  async logIn(username: string, password: string) {
    return await Parse.User.logIn(username, password);
  }
}
