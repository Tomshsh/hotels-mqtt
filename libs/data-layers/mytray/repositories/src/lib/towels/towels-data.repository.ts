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
      guestName: roomTowelsObj.guestName,
      currCount: roomTowelsObj.currCount
    });
    return roomTowels;

  }

  async update(roomTowelsObj: RoomTowelsDto){
    const q = new Parse.Query('RoomTowels');
    const roomTowels = await q.get(roomTowelsObj.id);
    roomTowels.set('room', {
      "__type":"Pointer",
      "className":"Room",
      "objectId":roomTowelsObj.room.id
    });
    roomTowels.set('currCount', roomTowelsObj.currCount);
    roomTowels.set('towelLimit', roomTowelsObj.towelLimit);
    roomTowels.set('cards', roomTowelsObj.cards);
    return roomTowels.save();
  }

  async delete(objectId: string): Promise<Parse.Object<Parse.Attributes>>{
    const q = new Parse.Query('RoomTowels');
    const roomTowels = await q.get(objectId);
    return roomTowels.destroy();
  }

  async getTowels() {
    const q = new Parse.Query('RoomTowels');
    const sessionToken = this.authquery.getValue().token;
    q.includeAll();
    return q.find({sessionToken});
  }

}