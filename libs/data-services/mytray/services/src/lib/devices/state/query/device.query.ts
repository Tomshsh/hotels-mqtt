import { Inject } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { DeviceModel } from '../models/device.model';
import { DeviceState } from '../state/device.state';


@Inject({
  provideIn: 'root'
})
export class DeviceQuery extends QueryEntity<DeviceState, DeviceModel> {

}
