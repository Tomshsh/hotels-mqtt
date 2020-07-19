import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewRef } from '@angular/core';
import { RoomDto } from '@my-tray/api-interfaces';
import { ROOMS_COLUMNS } from './core/settings';
import { ConfirmPromptDialogComponent } from '@my-tray/shared/layout';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { RoomDataService } from '@my-tray/data-services/mytray/services';
import { Subject } from 'rxjs';
import { Deferred } from 'ng2-smart-table/lib/lib/helpers';

@Component({
  selector: 'my-tray-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  dataSource: RoomDto[];
  loading: boolean;
  columns: any = ROOMS_COLUMNS;

  private confirm: NbDialogRef<ConfirmPromptDialogComponent>;

  private confirmOptions = {
    hasBackdrop: true,
    closeOnBackdropClick: false,
    autoFocus: true,
    context: { content: 'Are you sure you want to do this?' }
  };

  constructor(private readonly service: RoomDataService,
              private readonly dialogService: NbDialogService,
              private readonly toastrService: NbToastrService,
              private readonly cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.service.getRooms().subscribe((rooms: RoomDto[]) => {
      this.dataSource = rooms;
      this.loading = false;
      this.immidiate();
    });
  }

  onCreateRowConfirm(event: { newData: RoomDto, confirm: Deferred }) {
    console.log('::Create row::', event);
    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);
    this.confirm.componentRef.instance.onConfirm.subscribe((confirmEvent) => {
      this.service.create(event.newData).subscribe(() => {
        event.confirm.resolve();
        this.confirm.close();
        this.toastrService.success('Successfully created Room', `Creating Room`);
        this.immidiate();
      }, error => {
        event.confirm.resolve();
        this.confirm.close();
        this.toastrService.danger('Failed creating Room', `Creating Room`);
      });
    });
  }

  onEditRowConfirm(event: { newData: RoomDto, confirm: Deferred }) {
    console.log('::Update row::', event);
    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);
    this.confirm.componentRef.instance.onConfirm.subscribe((confirmEvent) => {
      this.service.update({
        objectId: event.newData.objectId,
        floor: event.newData.floor,
        isOccupied: event.newData.isOccupied,
        isUtility: event.newData.isUtility,
        name: event.newData.name,
        num: event.newData.num,
      }).subscribe((updatedRoom: RoomDto) => {
        event.confirm.resolve();
        this.confirm.close();
        this.toastrService.success('Successfully update Room', `Updating Room`);
        this.immidiate();
      }, error => {
        this.confirm.close();
        this.toastrService.danger('Failed updating Room', `Updating Room`);
      })
    });

    this.confirm.componentRef.instance.onCancel.subscribe((confirmEvent) => {
      event.confirm.reject();
      this.confirm.close();
    });
  }

  onDeleteRowConfirm(event: { data: RoomDto, confirm: Deferred }) {
    console.log('::Delete row::', event);
    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);

    this.confirm.componentRef.instance.onConfirm.subscribe((confirmEvent) => {
      this.service.delete(event.data.objectId).subscribe(() => {
        event.confirm.resolve();
        this.confirm.close();
        this.toastrService.success('Successfully Deleted a Room', `Deleting Room`);
        setTimeout(() => {
          this.cd.detectChanges();
        }, 300);
      }, (err) => {
        event.confirm.reject();
        this.toastrService.danger('Failed deleting Room', `Deleting Room`);
      })
    });

    this.confirm.componentRef.instance.onCancel.subscribe((confirmEvent) => {
      event.confirm.reject();
      this.confirm.close();
    });
  }

  private immidiate() {
    setTimeout(() => {
      if (this.cd && !(this.cd as ViewRef).destroyed) {
        this.cd.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
