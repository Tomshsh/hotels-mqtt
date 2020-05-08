import { Component, OnInit, Inject } from '@angular/core';
import { NbDialogService, NbDialogRef, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbGetters } from '@nebular/theme';

export interface DialogData {}

export interface Device {
  socket: number
  status: 'Active'| 'Inactive'
  started: string
  stopped: string
  counter: string
}



@Component({
  selector: 'p2p-device-modal',
  templateUrl: './device-modal.component.html',
  styleUrls: ['./device-modal.component.css']
})
export class DeviceModalComponent implements OnInit {

  dataSource: NbTreeGridDataSource<Device>
  customColumn = 'socket';
  defaultColumns = [ 'status', 'started', 'stopped', 'counter' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  data

  constructor(
    protected dialogRef: NbDialogRef<any>,
    dataSourceBuilder: NbTreeGridDataSourceBuilder<Device>
  ) {
    const getters: NbGetters<Device, Device> = {
      dataGetter: (node: Device) => node
    };
    this.dataSource = dataSourceBuilder.create(this.data, getters)
   }

  ngOnInit(): void {
    console.log(this.data)
  }

  close(){
    this.dialogRef.close()
  }


}

