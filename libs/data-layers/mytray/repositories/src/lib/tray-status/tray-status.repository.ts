import { Injectable } from '@angular/core';
import { Repository } from '../repository';
import { TrayStatus } from '@my-tray/api-interfaces';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class TrayStatusRepository<T extends TrayStatus> extends Repository<T> {
  constructor() {
    super();
  }

  async getAll(): Promise<TrayStatus[]> {
    return await new Parse.Query(Parse.Object.extend('Tray'))
      .include('room')
      .include('tray')
      .find()
      .then((trayStatuses) => {
        return trayStatuses.map((status) => {

        });
      });
  }
}
