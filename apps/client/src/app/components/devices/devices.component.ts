import { Component, OnInit } from '@angular/core';
import { DevicesService } from '@my-tray/data-services/mytray/services';
import { DeviceDto } from '@my-tray/api-interfaces';

@Component({
  selector: 'my-tray-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  dataSource: DeviceDto[];

  columns = {
    objectId: {
      title: 'id',
      width: '50px'
    },
    createdAt: {
      title: 'createdAt'
    },
    name: {
      title: 'name'
    }
  };

  settings = {
    columns: this.columns,
    mode: 'external',
    pager : {perPage:50},                            //pagination – rows per page
    hideSubHeader: false,                             //hide header searchboxes for search (filters)
    actions:{add:false, edit:false, delete:false},   //hide first column having ADD DELETE anchors
    attr:{class:"table table-hover table-striped"},  //use bootstrap zebra style
  };

  constructor(private readonly devicesService: DevicesService) { }

  ngOnInit(): void {
    this.devicesService.getDevices().subscribe((devices: DeviceDto[]) => {
      this.dataSource = devices;
    });
  }
}
