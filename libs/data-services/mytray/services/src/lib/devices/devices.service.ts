import { Injectable } from '@angular/core';
import { DevicesDataRepository } from '@my-tray/data-layers/mytray/repositories';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { DeviceDto } from '@my-tray/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  constructor(private readonly devicesDataRepository: DevicesDataRepository) {
  }

  getDevices(): Observable<DeviceDto[]> {
    return fromPromise(this.devicesDataRepository.getDevices().then((devices: any[]) => {
      return devices.map((device: any) => {
        const deviceResult: DeviceDto = {
          objectId: device.toJSON().objectId,
          createdAt: device.toJSON().createdAt,
          name: device.toJSON().name
        };
        return deviceResult;
      });
    }));
  }

  getLiveQuery() {
    return this.devicesDataRepository.liveQuery();
  }
}
