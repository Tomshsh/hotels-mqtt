import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { DeviceState } from '../state';
import { DeviceModel } from '../models';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'devices' })
export class DeviceStore extends EntityStore<DeviceState, DeviceModel> {
  constructor() {
    super();
  }
}
