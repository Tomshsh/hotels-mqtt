import { Injectable } from '@nestjs/common';
import Parse from 'parse/node'

@Injectable()
export class AppService {
  getData() {
    const q = new Parse.Query('Locker');
    return q.find()
    .then(lockers => lockers)
  }
}
