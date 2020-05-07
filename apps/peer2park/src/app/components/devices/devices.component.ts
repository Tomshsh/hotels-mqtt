import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, AfterContentInit, SimpleChange, Input } from '@angular/core';
import { RoutingComponent } from '@my-tray/shared/utilities';
import { LocalDataSource, ViewCell, Cell } from 'ng2-smart-table';
import { tap } from 'rxjs/operators';
import { DatepickerRendererComponent, DateRangePickerComponent, SelectListComponent, SelectListRendererComponent, CustomActionsComponent } from '@my-tray/shared/layout';
import { SocketStatusRendererComponent } from '../socket-status-renderer/socket-status-renderer.component';
import { DeviceModalComponent } from '../device-modal/device-modal.component';
import { NbDialogService } from '@nebular/theme';
import Parse from 'parse'
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { fromPromise } from 'rxjs/internal-compatibility';

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
  <ui-data-grid [source]="dataSource" [columns]="columns"  [loading]="loading" [displayActions]="false" (userRowSelect)="openDialog($event)"></ui-data-grid>`,
  styleUrls: ['./devices.component.css']
})

@RoutingComponent()
export class DevicesComponent implements OnInit, AfterContentInit, OnChanges {
  dataSource: LocalDataSource;
  loading: boolean;
  columns = {
    serial: {
      title: 'Serial',
      type: 'text',
      valuePrepareFunction: (cell: any, row: Parse.Attributes) => {
        return row.deviceNo
      }
    },
    sockets: {
      title: 'Sockets',
      type: 'custom',
      renderComponent: SocketStatusRendererComponent,
      onComponentInitFunction: (btnGroup: SocketStatusRendererComponent) => {
        btnGroup.onInitFunction = function () {
          //     const sockets: Parse.Attributes = btnGroup.rowData.sockets
          //     btnGroup.indicators = sockets.map((s)=> s.socketNo)
          let sockets: any[] = btnGroup.value
          btnGroup.indicators = sockets.map(s => s.socketNo).filter(s => s < 7).sort((a, b) => a - b)
        }
      },
      valuePrepareFunction: (cell, row) => {
        const sockets: any[] = row.sockets
        console.log(sockets)
        return sockets.length ? sockets :null
      }
    },
    valve: {
      title: 'Valve',
      type: 'custom',
      renderComponent: SocketStatusRendererComponent,
      onComponentInitFunction: (btnGroup: SocketStatusRendererComponent) => {
      }
    },
    actions: {
      title: 'actions',
      type: 'custom',
      renderComponent: CustomActionsComponent,
      onComponentInitFunction: (actionsComp: CustomActionsComponent) => {
        actionsComp.buttons = ['control', 'history']
        actionsComp.clickHandler = (ref: HTMLButtonElement) => {
          switch (ref.innerText) {
            case 'control':
              break;

            default:
              break;
          }
        }
      }
    }
  };

  constructor(
    private readonly cd: ChangeDetectorRef,
    private dialog: NbDialogService,
    //private  devicesService: DevicesService
  ) {
  }

  openDialog($event): void {
    const dialogRef = this.dialog.open(DeviceModalComponent)
    dialogRef.componentRef.instance.data = $event.data
  }

  async ngOnInit() {
    //get devices, sockets, and valves from backend interface

    //   this.devicesService.getDevices().pipe(
    //     tap(() => this.loading = true)
    //   ).subscribe((devices: DeviceDto[]) => {
    let q = new Parse.Query(Parse.Object.extend('Device'))
    let sessionToken = Parse.User.current().get('sessionToken')
    let flatArr = []
    fromPromise(q.find({ sessionToken })
      .then(async (devices) => {
        await devices.map(async (d, i) => {
          let fDevice = d.toJSON()
          flatArr.push(fDevice)
          let sockets = await d.relation('sockets').query().select('active', 'consumption', 'resource', 'socketNo').find()
          flatArr[i].sockets = sockets.map(s => (s.toJSON()))
        })
        this.dataSource = new LocalDataSource(flatArr);
        console.log(this.dataSource)

      })).subscribe(()=>{setTimeout(()=>{this.cd.detectChanges(),0})})


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

  ngAfterContentInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes " + changes)
  }
}
