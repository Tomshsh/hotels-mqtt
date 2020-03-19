import { Inject } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { DeviceModel } from '../models';
import { DeviceState } from '../state';
import { DeviceStore } from '../store';


@Inject({
  provideIn: 'root'
})
export class DeviceQuery extends QueryEntity<DeviceState, DeviceModel> {
  constructor(protected store: DeviceStore) {
    super(store);
  }
}
