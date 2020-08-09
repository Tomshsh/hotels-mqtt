import { Injectable } from '@angular/core';
import Parse from 'parse'
import { AuthSessionQuery } from '@my-tray/shared/client/auth';
import { RoomTowelsDto } from '@my-tray/api-interfaces';

@Injectable({ providedIn: 'root' })
export class TowelsRepository {

  constructor(private readonly authquery: AuthSessionQuery) { }

  async saveTowels(roomTowelsObj: RoomTowelsDto) {
    let roomTowels = new Parse.Object('RoomTowels');
    roomTowels = await roomTowels.save({
      cards : roomTowelsObj.cards,
      room: {
        "__type":"Pointer",
        "className":"Room",
        "objectId":roomTowelsObj.room.id
      },
      lang: roomTowelsObj.lang,
      towelLimit:roomTowelsObj.towelLimit,
      guestName: roomTowelsObj.guestName
    });
    return roomTowels;

  }

  async getTowels() {
    const q = new Parse.Query('RoomTowels');
    const sessionToken = this.authquery.getValue().token;
    q.includeAll();
    return q.find({sessionToken});
  }

}