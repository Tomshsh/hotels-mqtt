import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SelectListComponent } from '@my-tray/shared/layout';
import { RoomDataService } from '@my-tray/data-services/mytray/services';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RoomDto } from '@my-tray/api-interfaces';

@Component({
  selector: 'my-tray-select-room-renderer',
  template: `
    <ui-select-list
      [rowData]="rowData"
      (itemSelect)="onItemSelect($event)"
      [selectedItem]="selectedItem">
    </ui-select-list>
  `
})
export class SelectRoomRendererComponent extends SelectListComponent implements OnInit {
  private readonly destroy$: Subject<any> = new Subject<any>();
  rowData: any[] = [];

  constructor(private readonly roomService: RoomDataService,
              private readonly cd: ChangeDetectorRef) {
    super();
    this.rowData.push({ value: '', title: 'Select Room' });
  }

  ngOnInit(): void {
    if (!this.cell.getRow().getData().room) {
      this.selectedItem = this.rowData[0];
    }
    this.roomService.getAllRooms()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          setTimeout(() => {
            this.cd.detectChanges();
          }, 300);
        })
      )
      .subscribe((rooms: RoomDto[]) => {
        const options = rooms.map(room => {
          return { value: room.objectId, title: room.name }
        });
        this.rowData.push(...options);

        try {
          const { name } = this.cell.getRow().getData()?.room;
          if (!name) {
            this.selectedItem = this.rowData[0];
          } else {
            this.selectedItem =
              this.rowData.find((room) => room.title === name);
            this.cell.newValue = this.selectedItem;
          }
        } catch (e) {
          this.selectedItem = this.rowData[0];
        }
      });
  }

  onItemSelect($event: any) {
    this.selectedItem = $event;
    this.cell.newValue = $event;
  }
}
