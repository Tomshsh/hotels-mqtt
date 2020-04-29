import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RoutingComponent } from '@my-tray/shared/utilities';
import { LocalDataSource } from 'ng2-smart-table';
import { tap } from 'rxjs/operators';
import { DatepickerRendererComponent, DateRangePickerComponent, SelectListComponent, SelectListRendererComponent, BtnGroupComponent } from '@my-tray/shared/layout';

class Valve {
  started: string;
  stopped: string;
  state: "on" | "off";
  kwt: number;
}


class Socket extends Valve {
  serial: number;
}

class DeviceDto {
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
      type: 'custom',
      renderComponent: BtnGroupComponent,
      editor: {
        type: 'custom',
        component: BtnGroupComponent,
        config: {
        }
      }
    },
    valve: {
      title: 'Valve',
      type: 'custom',
      renderComponent: BtnGroupComponent
    },
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: true,
      custom: [
        { name: 'viewrecord', title: '<i class="fa fa-eye"></i>' },
        { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      ],
      position: 'right'
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
    const devices: DeviceDto[] = [
      {
        serial: 'A1',
        sockets: [
          {
            serial:1,
            started: 'yesterday',
            stopped: 'christmans',
            state: "off",
            kwt: 300
          },{
            serial:2,
            started: 'yesterday',
            stopped: 'christmans',
            state: "off",
            kwt: 300
          },{
            serial:3,
            started: 'yesterday',
            stopped: 'christmans',
            state: "off",
            kwt: 300
          },{
            serial:4,
            started: 'yesterday',
            stopped: 'christmans',
            state: "off",
            kwt: 300
          }
        ],
        valve: {
            started: 'yesterday',
            stopped: 'christmans',
            state: "off",
            kwt: 300
        }
      }
    ]
    this.dataSource = new LocalDataSource(devices);
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
