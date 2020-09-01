import { Injectable } from '@nestjs/common';
import Parse from 'parse/node'

@Injectable()
export class AppService {
  getData() {
    const q = new Parse.Query('Locker');
    return q.find({sessionToken: Parse.User.current().getSessionToken()})
    .then(lockers => lockers)
  }
}
