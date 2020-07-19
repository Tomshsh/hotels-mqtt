import { Injectable } from '@angular/core';
import { Room, RoomDto } from '@my-tray/api-interfaces';

import * as Parse from 'parse';
import { Repository } from '../repository';

@Injectable({
  providedIn: 'root'
})
export class RoomDataRepository<T extends Room> extends Repository<T> {
  constructor() {
    super();
  }

  async getRooms(): Promise<Room[]> {
    return await
      new Parse.Query(Parse.Object.extend('Room'))
        .find()
        .then(rooms => {
          return rooms.map((room) => {
            const currentRoom = room.toJSON();
            return {
              objectId: currentRoom.objectId,
              name: currentRoom.name,
              floor: currentRoom.floor,
              isOccupied: currentRoom.isOccupied,
              isUtility: currentRoom.isUtility,
              num: currentRoom.num
            };
          });
        })
  }

  async getRoomById(objectId: string): Promise<Room> {
    return await new Parse.Query(Parse.Object.extend('Room'))
      .equalTo('objectId', objectId)
      .first()
      .then((room) => {
        const jsonRoom = room.toJSON();
        return {
          objectId: jsonRoom.objectId,
          floor: jsonRoom.floor,
          isOccupied: jsonRoom.isOccupied,
          isUtility: jsonRoom.isUtility,
          name: jsonRoom.name,
          num: jsonRoom.num
        };
      })
  }

  async updateRoom(model: RoomDto): Promise<Room> {
    try {
      const updateModel = await new Parse.Query(Parse.Object.extend('Room'))
        .equalTo('objectId', model.objectId)
        .first();
      updateModel.set('name', model.name);
      updateModel.set('floor', Number(model.floor));
      updateModel.set('isOccupied', model.isOccupied);
      updateModel.set('isUtility', model.isUtility);
      updateModel.set('num', Number(model.num));
      await updateModel.save();

      const jsonUpdateModel = updateModel.toJSON();

      return Promise.resolve({
        objectId: jsonUpdateModel.objectId,
        floor: jsonUpdateModel.floor,
        isOccupied: jsonUpdateModel.isOccupied,
        isUtility: jsonUpdateModel.isUtility,
        name: jsonUpdateModel.name,
        num: jsonUpdateModel.num
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
