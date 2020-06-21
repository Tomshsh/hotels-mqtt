import { Injectable } from '@angular/core';
import { RoomDataRepository } from '../rooms';
import { Room, Tray, TrayDto } from '@my-tray/api-interfaces';
import * as Parse from 'parse';
import { Repository } from '../repository';

@Injectable({
  providedIn: 'root'
})
export class TrayDataRepository<T extends Tray> extends Repository<T> {
  constructor(private readonly roomDataRepository: RoomDataRepository<Room>) {
    super();
  }

  async getTrays(): Promise<Tray[]> {
    return await new Parse.Query(Parse.Object.extend('Tray'))
      .include('room')
      .find().then((trays) => {
        return trays.map((tray) => {
          const thisJsonTray = tray.toJSON();
          const mappedTray: Tray = {
            objectId: thisJsonTray.objectId,
            title: thisJsonTray.title,
            isOnline: thisJsonTray.isOnline,
            isService: thisJsonTray.isService,
            room: thisJsonTray.room,
          };
          return mappedTray;
        });
      })
  }

  async deleteTray(objectId: string): Promise<void> {
    await this.delete(objectId, 'Tray');
  }

  async updateTray(tray: TrayDto): Promise<Tray> {
    try {
      const updateTray = await new Parse.Query(Parse.Object.extend('Tray'))
        .equalTo('objectId', tray.objectId)
        .first();

      const selectedRoom = await this.roomDataRepository.getRoomById(tray.room.objectId || tray.room.value);
      updateTray.set('room', {
        __type: 'Pointer',
        objectId: selectedRoom.objectId,
        className: 'Room'
      });
      await updateTray.save();
      const returnTray = updateTray.toJSON();
      return Promise.resolve({
        room: selectedRoom,
        isService: returnTray.isService,
        isOnline: returnTray.isOnline,
        title: returnTray.title,
        objectId: returnTray.objectId
      } as Tray);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
