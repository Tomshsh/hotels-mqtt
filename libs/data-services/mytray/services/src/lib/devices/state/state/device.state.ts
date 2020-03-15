import { EntityState } from '@datorama/akita';
import { DeviceModel } from '../models/device.model';

export interface DeviceState extends EntityState<DeviceModel> {}
