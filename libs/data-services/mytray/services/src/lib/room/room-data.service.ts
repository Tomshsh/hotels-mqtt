import { Inject, Injectable } from '@angular/core';
import { RoomDataRepository } from '@my-tray/data-layers/mytray/repositories';
import { IEnvironment, Room, RoomDto } from '@my-tray/api-interfaces';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { AuthSessionQuery } from '@my-tray/shared/client/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomDataService {
  private baseURL = `${ this.env.parse.serverURL }classes/`;

  constructor(private readonly repository: RoomDataRepository<Room>,
              private readonly httpClient: HttpClient,
              private readonly authQuery: AuthSessionQuery,
              @Inject('env') private readonly env: IEnvironment) {
  }

  getRooms(): Observable<RoomDto[]> {
    return fromPromise(
      this.repository.getRooms().then((rooms: Room[]) => {
        return rooms.map((room: Room) => {
          return {
            floor: room.floor,
            isOccupied: room.isOccupied,
            isUtility: room.isUtility,
            objectId: room.objectId,
            name: room.name,
            num: room.num
          } as RoomDto;
        });
      })
    );
  }

  create(entity: RoomDto): Observable<RoomDto> {
    const body = {
      'objectId': entity.objectId,
      'floor': Number(entity.floor),
      'isOccupied': entity.isOccupied,
      'isUtility': entity.isUtility,
      'name': entity.name,
      'num': Number(entity.num),
      'ACL': this.authQuery.getAcl()[0].acl
    };

    return this.httpClient.post<Room>(`${ this.baseURL }Room`, body, {
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('X-Parse-Session-Token', this.authQuery.getValue().token)
        .append('X-Parse-Application-Id', this.env.parse.appId)
    });
  }

  update(entity: RoomDto): Observable<RoomDto> {
    return fromPromise(
      this.repository.updateRoom(entity).then((updatedEntity: Room) => {
        return {
          objectId: updatedEntity.objectId,
          isOccupied: updatedEntity.isOccupied,
          isUtility: updatedEntity.isUtility,
          name: updatedEntity.name,
          num: updatedEntity.num,
          floor: updatedEntity.floor,
        } as RoomDto;
      })
    );
  }

  delete(objectId: string) : Observable<void> {
    return fromPromise(
      this.repository.delete(objectId, 'Room')
    );
  }
}
