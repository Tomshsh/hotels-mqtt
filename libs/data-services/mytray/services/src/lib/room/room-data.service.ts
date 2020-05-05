import { Injectable } from '@angular/core';
import { RoomDataRepository } from '@my-tray/data-layers/mytray/repositories';
import { Room, RoomDto } from '@my-tray/api-interfaces';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class RoomDataService {

  constructor(private readonly repository: RoomDataRepository<Room>) {
  }

  getAllRooms(): Observable<RoomDto[]> {
    return fromPromise(
      this.repository.getRooms().then((rooms: Room[]) => {
        return rooms.map((room: Room) => {
          return {
            floor: room.floor,
            isOccupied: room.isOccupied,
            isUtility: room.isUtility,
            objectId: room.objectId,
            name: room.name,
            num:  room.num
          } as RoomDto;
        });
      })
    );
  }
}
