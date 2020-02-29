import { Injectable } from '@angular/core';
import { environment } from '@env/client/environment';
import * as Parse from 'parse/node';

@Injectable({
  providedIn: 'root'
})
export class UsersRepository {
  constructor() {
    Parse.initialize(environment.parse.appId, '', environment.parse.masterKey);
    (Parse as any).serverURL = environment.parse.serverURL;
  }

  async login(username: string, password: string)  {
      return  await Parse.User.logIn(username, password);
  }

  async logout() {
    return await Parse.User.logOut();
  }
}
