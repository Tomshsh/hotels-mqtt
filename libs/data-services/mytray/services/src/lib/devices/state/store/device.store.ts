import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { DeviceState } from '../state/device.state';
import { DeviceModel } from '../models/device.model';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'devices' })
export class ContactsStore extends EntityStore<DeviceState, DeviceModel> {
  constructor() {
    super();
  }
}
