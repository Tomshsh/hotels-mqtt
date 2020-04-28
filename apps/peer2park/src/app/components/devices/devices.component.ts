import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RoutingComponent } from '@my-tray/shared/utilities';
import { LocalDataSource } from 'ng2-smart-table';
import { tap } from 'rxjs/operators';
import { DatepickerRendererComponent, DateRangePickerComponent, SelectListComponent, SelectListRendererComponent, BtnGroupComponent } from '@my-tray/shared/layout';
import { UserDto } from '@my-tray/api-interfaces';

class Valve {
  started: string;
  stopped: string;
  state: "on" | "off";
  kwt: number;
  user: UserDto;
}


class Socket extends Valve {
  serial: number;
}

class DeviceDto {
  id: string
  serial: string;
  sockets: Socket[];
  valve: Valve;

}



@Component({
  selector: 'p2p-devices',
  template: '<ui-data-grid [source]="dataSource" [columns]="columns"  [loading]="loading"></ui-data-grid>',
  styleUrls: ['./devices.component.css']
})

@RoutingComponent()
export class DevicesComponent implements OnInit {
  dataSource: DeviceDto[] | LocalDataSource;
  loading: boolean;
  columns = {
    serial: {
      title: 'Serial',
      type: 'text'
    },
    sockets: {
      title: 'Sockets',
      type: 'text',
      editor: {
        type: 'custom',
        component: BtnGroupComponent,
        config: {
        }
      }
    },
    valve: {
      title: 'Valve',
      type: 'text'
    }
  };

  constructor(private readonly cd: ChangeDetectorRef,
    //private readonly devicesService: DevicesService
  ) {
  }

  ngOnInit(): void {
    //get devices, sockets, and valves from backend interface
  //   this.devicesService.getDevices().pipe(
  //     tap(() => this.loading = true)
  //   ).subscribe((devices: DeviceDto[]) => {
  //     this.dataSource = new LocalDataSource(devices);
  //     setTimeout(() => {
  //       this.cd.detectChanges();
  //     }, 0);
  //   },
  //     (error) => {
  //     },
  //     () => {
  //       this.loading = false;
  //     });

  }
}
