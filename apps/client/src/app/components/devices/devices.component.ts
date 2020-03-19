import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DevicesService } from '@my-tray/data-services/mytray/services';
import { DeviceDto } from '@my-tray/api-interfaces';
import { LiveQuerySubscription } from 'parse';
import { RoutingComponent } from '@my-tray/shared/utilities';

@Component({
  selector: 'my-tray-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
@RoutingComponent()
export class DevicesComponent implements OnInit {
  dataSource: DeviceDto[];
  loading: boolean;

  columns = {
    objectId: {
      title: 'ID',
      type: 'string'
    },
    createdAt: {
      title: 'Created',
      type: 'string'
    },
    name: {
      title: 'Name',
      type: 'string'
    }
  };

  constructor(private readonly devicesService: DevicesService,
              private readonly cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.devicesService.getDevices().subscribe((devices: DeviceDto[]) => {
      this.dataSource = devices;
      this.loading = false;
    });


    this.devicesService.getLiveQuery().then((live: LiveQuerySubscription) => {
      live.on('update', (device: any) => {
        const foundDeviceIndex = this.dataSource
          .findIndex(x => x.objectId === device.toJSON().objectId);
        const copyArray: DeviceDto[] = [];
        Object.assign(copyArray, this.dataSource);
        copyArray[foundDeviceIndex] = {
          objectId: device.toJSON().objectId,
          createdAt: device.toJSON().createdAt,
          name: device.toJSON().name
        } as DeviceDto;
        this.dataSource = copyArray;
      });
    });
  }
}
