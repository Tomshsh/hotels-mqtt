import { Injectable } from '@angular/core';
import { TowelsRepository } from '@my-tray/data-layers/mytray/repositories'
import { RoomTowelsDto } from '@my-tray/api-interfaces';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TowelsService {

  constructor(private towelsRepo: TowelsRepository) { }

  saveTowels(roomTowelsObj: RoomTowelsDto) {
    return this.towelsRepo.saveTowels(roomTowelsObj)
  }

  private parseObjToDto(obj: Parse.Object<Parse.Attributes>): RoomTowelsDto {
    return {
      room: {
        name: obj.get('room').get('name'),
        id: obj.get('room').id
      },
      id: obj.id,
      towelLimit: obj.get('towelLimit'),
      cards: obj.get('cards'),
      lang: obj.get('lang'),
      guestName: obj.get('guestName'),
      currCount: obj.get('currCount')
    }
  }

  update(obj): Observable<void> {
    return fromPromise(
      this.towelsRepo.update(obj)
        .then(() => { }));
  }

  delete(objectId){
    return fromPromise(
      this.towelsRepo.delete(objectId)
      .then(()=>{}));
  }

  getTowels(): Observable<RoomTowelsDto[]> {
    return fromPromise(this.towelsRepo.getTowels().then(roomTowels => {
      return roomTowels.map(this.parseObjToDto);
    }));
  }
}