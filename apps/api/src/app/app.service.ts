import { ConfigurationService } from '@my-tray/shared/backend';
import { Injectable } from '@nestjs/common';
import Parse from 'parse/node'

@Injectable()
export class AppService {

  constructor(private configService: ConfigurationService) { }

  getData() {
    const q = new Parse.Query('Locker');
    return q.find({ sessionToken: Parse.User.current().getSessionToken() })
      .then(lockers => lockers)
  }

  findDevice(deviceId: string): Promise<Parse.Object> {
    console.log(deviceId)
    let device: Parse.Object;
    const devices = ['Minibar', 'Locker', 'Tray']

    const query = (deviceClass) => {
      return new Parse.Query(deviceClass)
        .equalTo('deviceId', deviceId)
        .include('room.hotel')
        .first({ sessionToken: this.configService.user.getSessionToken() })
    }

    return new Promise(async (resolve, reject) => {
      while (!device && devices.length) {
        device = await query(devices.shift())
      }
      if (device) resolve(device)
      else reject('not found')
    })
  }

  getHotelAcl(hotelName) {
    return new Parse.Query("Hotel")
      .equalTo('baseTopic', hotelName)
      .first({ sessionToken: this.configService.user.getSessionToken() })
      .then(hotel => hotel.getACL())
  }

  handleNonJsonMsg(msg:{} | string): any{
    let newMsg;
    if(typeof msg == "string"){
      newMsg = {}
      const extracted = msg.match(/\w+/g)
      extracted.map((w, i)=> {
        if(i%2 == 0) newMsg[w] =  extracted[i+1]
      })
    }
    else newMsg = msg
    return newMsg
  }

}