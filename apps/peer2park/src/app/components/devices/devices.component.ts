import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RoutingComponent } from '@my-tray/shared/utilities';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { DevicesService } from '@my-tray/data-services/peer2park/services'
import { DEVICES_COLUMNS } from './core/classes/devices-columns';

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
  template: `
  <ui-data-grid [source]="dataSource" [columns]="columns" [loading]="loading" [actions]="false"></ui-data-grid>`,
  styleUrls: ['./devices.component.css']
})

@RoutingComponent()
export class DevicesComponent implements OnInit {
  dataSource: LocalDataSource;
  loading: boolean;
  readonly columns: any = DEVICES_COLUMNS;

  constructor(
    private readonly cd: ChangeDetectorRef,
    private dialog: NbDialogService,
    private devicesService: DevicesService
  ) {}

  async ngOnInit() {
    this.loading = true
    this.devicesService.getDevices().subscribe(
      (devices)=>{
        this.dataSource = new LocalDataSource(devices);
        this.loading = false
        setTimeout(()=>{
          this.cd.detectChanges()
        })
      }
    )
  }
}
