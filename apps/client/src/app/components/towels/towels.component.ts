import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { COLUMNS } from './core';
import { TowelsService } from '@my-tray/data-services/mytray/services';
import { RoomTowelsDto } from '@my-tray/api-interfaces';

@Component({
  selector: 'my-tray-towels',
  template: `
    <ui-data-grid [columns]='columns' [source]='dataSource' [actions]="true" (updateConfirm)="onEditRowConfirm($event)" [actions]="undefined" ></ui-data-grid>
  `,
  styleUrls: ['./towels.component.css']
})
export class TowelsComponent implements OnInit {

  loading: boolean;
  columns = COLUMNS;
  dataSource: RoomTowelsDto[];

  constructor(
    private towelsService: TowelsService,
    private cd: ChangeDetectorRef
    ) { }

  private immidiate() {
    setTimeout(() => {
      this.cd.detectChanges();
    });
  }

  onEditRowConfirm(e){
    console.log('edit')
  }

  ngOnInit(): void {
    this.loading = true;
    this.towelsService.getTowels()
    .subscribe(roomTowels => {
      this.dataSource = roomTowels;
      this.immidiate();
      this.loading = false;
    })
  }

}
