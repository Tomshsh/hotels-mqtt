import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { COLUMNS } from './core';
import { TowelsService } from '@my-tray/data-services/mytray/services';
import { RoomTowelsDto } from '@my-tray/api-interfaces';
import { Deferred } from 'ng2-smart-table/lib/lib/helpers';
import { NbDialogService, NbToastrService, NbDialogRef } from '@nebular/theme';
import { ConfirmPromptDialogComponent } from '@my-tray/shared/layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'my-tray-towels',
  template: `
    <ui-data-grid
      [columns]='columns'
      [source]='dataSource'
      [actions]="{edit:true, delete:true, add:false}"
      (updateConfirm)="onEditRowConfirm($event)"
      (deleteConfirm)="onDeleteRowConfirm($event)"
      ></ui-data-grid>
  `,
  styleUrls: ['./towels.component.css']
})
export class TowelsComponent implements OnInit {
  private readonly destroy$ = new Subject<void>();

  loading: boolean;
  columns = COLUMNS;
  dataSource: RoomTowelsDto[];


  constructor(
    private towelsService: TowelsService,
    private cd: ChangeDetectorRef,
    private readonly dialogService: NbDialogService,
    private readonly toastrService: NbToastrService,
  ) { }

  private confirm: NbDialogRef<ConfirmPromptDialogComponent>;
  private confirmOptions = {
    hasBackdrop: true,
    closeOnBackdropClick: false,
    autoFocus: true,
    context: { content: 'Are you sure you want to do this?' }
  };


  private immidiate() {
    setTimeout(() => {
      this.cd.detectChanges();
    });
  }

  private newDataToObj(newData): RoomTowelsDto {
    return {
      id: newData.id,
      room: {
        id: newData.room.value,
        name: newData.room.title
      },
      cards: newData.cards,
      towelLimit: Number(newData.towelLimit),
      guestName: newData.guestName,
      lang: newData.lang,
      currCount: Number(newData.currCount)
    }
  }

  private handleSubOutcome(eventConfirm: Deferred, error?: any) {
    eventConfirm.resolve();
    this.confirm.close();
    if (!error) {
      this.toastrService.success('Successfully updated', `Updating table`);
      this.immidiate();
      this.loadDataSource();
    } else {
      this.toastrService.danger('Failed to update', `Updating Table`);
      console.error(error);
    }
  }

  onEditRowConfirm(event: { newData: any, confirm: Deferred }) {
    console.log('::Update row::', event);
    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);
    this.confirm.componentRef.instance.onConfirm
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmEvent) => {
        this.towelsService.update(this.newDataToObj(event.newData))
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.handleSubOutcome(event.confirm);
          }, error => {
            this.handleSubOutcome(event.confirm, error);
          });
      });

    this.confirm.componentRef.instance.onCancel.subscribe((confirmEvent) => {
      event.confirm.reject();
      this.confirm.close();
    });
  }

  onDeleteRowConfirm(event: { data: RoomTowelsDto, confirm: Deferred }) {
    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);

    this.confirm.componentRef.instance.onConfirm.subscribe((confirmEvent) => {
      this.towelsService.delete(event.data.id).subscribe(() => {
        this.handleSubOutcome(event.confirm)
      }, (err) => {
        event.confirm.reject();
        this.toastrService.danger('Failed to delete', `Deleting`);
      })
    });

    this.confirm.componentRef.instance.onCancel.subscribe((confirmEvent) => {
      event.confirm.reject();
      this.confirm.close();
    });
  }

  private loadDataSource(){
    this.loading = true;
    this.towelsService.getTowels()
      .subscribe(roomTowels => {
        this.dataSource = roomTowels;
        this.immidiate();
        this.loading = false;
      })
  }

  ngOnInit(): void {
    this.loadDataSource();
  }

}
