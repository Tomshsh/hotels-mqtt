import { Injectable } from '@angular/core';
import * as Parse from 'parse'
import { environment } from '@my-tray/env/client/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersRepository {
  constructor() {
    Parse.initialize(environment.parse.appId, environment.parse.masterKey);
    (Parse as any).serverURL = environment.parse.serverURL;
  }

  async logIn(username: string, password: string) {
    return await Parse.User.logIn(username, password);
  }
}
