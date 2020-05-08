import { Injectable } from '@angular/core';
import Parse from 'parse'
import {fromPromise} from 'rxjs/internal-compatibility'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor() { }

  getDevices(): Observable<any>{
    let q = new Parse.Query(Parse.Object.extend('Device'))
      let sessionToken = Parse.User.current().get('sessionToken')
      let flatArr = []
      return fromPromise(
        q.find({ sessionToken })
        .then((devices) => {
          return devices.map((d, i) => {
            let fDevice = d.toJSON()
            flatArr.push(fDevice)
            d.relation('sockets')
            .query()
            .select('active', 'consumption', 'resource', 'socketNo')
            .find()
            .then(sockets => {
              flatArr[i].sockets = sockets.map(s => (s.toJSON()))
            })
          })
        }).then(()=>{
          return flatArr
        })

        )
  }


}

