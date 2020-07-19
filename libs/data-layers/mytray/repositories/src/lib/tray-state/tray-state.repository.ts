import { Injectable } from '@angular/core';
import { Repository } from '../repository';
import { TrayStateEntity } from '@my-tray/api-interfaces/entities';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class TrayStateRepository<T extends TrayStateEntity> extends Repository<T> {
  constructor() {
    super();
  }

  async getAll(): Promise<TrayStateEntity[]> {
    return await new Parse.Query(TrayStateEntity)
      .include('room')
      .include('tray')
      .include('tray.template')
      .include('tray.tag.product')
      .find()
      .then((trayStatuses: TrayStateEntity[]) => {
        return trayStatuses;
      });
  }
}
