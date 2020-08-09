import { Injectable } from '@angular/core';
import Parse from 'parse'
import { RoomTowelsDto } from '@my-tray/api-interfaces';

@Injectable({ providedIn: 'root' })
export class TowelsRepository {

  constructor() { }

  async saveTowels(roomTowelsObj: RoomTowelsDto) {
    let roomTowels = new Parse.Object('RoomTowels')
    try {
      roomTowels = await roomTowels.save(roomTowelsObj)
      return roomTowels
    } catch (err) {
      throw new Error(err.message)
    }

  }

}