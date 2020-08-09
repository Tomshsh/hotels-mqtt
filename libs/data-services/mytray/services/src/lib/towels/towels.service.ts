import { Injectable } from '@angular/core';
import { TowelsRepository } from '@my-tray/data-layers/mytray/repositories'
import { RoomTowelsDto } from '@my-tray/api-interfaces';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TowelsService {

  constructor(private towelsRepo: TowelsRepository) { }

  async saveTowels(roomTowelsObj: RoomTowelsDto) {
    const roomTowels = await this.towelsRepo.saveTowels(roomTowelsObj)
    return roomTowels
  }

  getTowels():Observable<RoomTowelsDto[]> {
    return fromPromise(this.towelsRepo.getTowels().then(roomTowels => {
        return roomTowels.map(r => {
          const towelsObj: RoomTowelsDto = {
            room: {
              num:r.get('room').get('num'),
              id:r.get('room').id
            },
            towelLimit: r.get('towelLimit'),
            cards: r.get('cards'),
            lang: r.get('lang'),
            guestName: r.get('guestName')
          };
          return towelsObj;
        });

      }));
  }
}