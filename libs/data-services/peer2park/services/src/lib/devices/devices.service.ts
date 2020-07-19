import { Injectable } from '@angular/core';
import Parse from 'parse'
import { fromPromise } from 'rxjs/internal-compatibility'
import { Observable } from 'rxjs';
import { AuthSessionQuery } from '@my-tray/shared/client/auth';
import { materialize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private readonly authQuery: AuthSessionQuery) { }

  getDevices():Observable<any> {
    let q = new Parse.Query(Parse.Object.extend('Device'))
    let sessionToken = this.authQuery.getValue().token;
    return fromPromise(
      this._materializeDevices(q, sessionToken)
    )

  }

  async _materializeDevices(q: Parse.Query<Parse.Object<Parse.Attributes>>, sessionToken: string){
    let flatArr = []
    const devices = await q.find({ sessionToken })
    for(let i in devices){
      let fDevice = devices[i].toJSON()
      flatArr.push(fDevice)
    }
      return flatArr
  }

}


