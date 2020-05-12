import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TRAY_COLUMNS } from './core/settings';
import { TrayDataService } from '@my-tray/data-services/mytray/services';
import { TagDto, TrayDto } from '@my-tray/api-interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Deferred } from 'ng2-smart-table/lib/lib/helpers';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { NbDialogRef } from '@nebular/theme/components/dialog/dialog-ref';
import { ConfirmPromptDialogComponent } from '@my-tray/shared/layout';
import { toBoolean } from '@datorama/akita';

@Component({
  selector: 'my-tray-tray',
  templateUrl: './tray.component.html',
  styleUrls: ['./tray.component.scss']
})
export class TrayComponent implements OnInit {
  private destroy$ = new Subject<void>();

  loading: boolean;
  columns: any = TRAY_COLUMNS;
  dataSource: TrayDto[];

  private confirm: NbDialogRef<ConfirmPromptDialogComponent>;
  private confirmOptions = {
    hasBackdrop: true,
    closeOnBackdropClick: false,
    autoFocus: true,
    context: { content: 'Are you sure you want to do this?' }
  };

  constructor(private readonly dataService: TrayDataService,
              private readonly dialogService: NbDialogService,
              private readonly toastrService: NbToastrService,
              private readonly cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.dataService.getAllTrays()
      .pipe(takeUntil(this.destroy$))
      .subscribe((trays: TrayDto[]) => {
        this.dataSource = trays;
        this.loading = false;
        this.immidiate();
      });
  }

  onCreateRowConfirm(event: { newData: TrayDto, confirm: Deferred }) {
    const newTray = {
      objectId: event.newData.objectId,
      title: event.newData.title,
      room: event.newData.room,
      isService: toBoolean(event.newData.isService),
      isOnline: toBoolean(event.newData.isOnline)
    } as TrayDto;

    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);
    this.confirm.componentRef.instance.onConfirm
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmEvent) => {
        this.dataService.createTray(newTray)
          .pipe(takeUntil(this.destroy$))
          .subscribe(createdTray => {
            event.confirm.resolve();
            this.confirm.close();
            this.toastrService.success('Successfully created Tray', `Creating Tray`);
            this.immidiate();
          }, error => {
            event.confirm.resolve();
            this.confirm.close();
            this.toastrService.danger('Failed creating Tray', `Creating Tray`);
          });
      });


    this.confirm.componentRef.instance.onCancel.subscribe((confirmEvent) => {
      event.confirm.reject();
      this.confirm.close();
    });
  }

  onEditRowConfirm(event: { newData: any, confirm: Deferred }) {
    console.log('::Update row::', event);
    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);
    this.confirm.componentRef.instance.onConfirm
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmEvent) => {
        this.dataService.updateTray({
          objectId: event.newData.objectId,
          title: event.newData.title,
          room: event.newData.room,
          isService: toBoolean(event.newData.isService),
          isOnline: toBoolean(event.newData.isOnline)
        } as TrayDto).pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            event.confirm.resolve();
            this.confirm.close();
            this.toastrService.success('Successfully updated Tray', `Updating Tray`);
            this.immidiate();
          }, error => {
            event.confirm.resolve();
            this.confirm.close();
            this.toastrService.danger('Failed updating Tray', `Updating Tray`);
          });
      });

    this.confirm.componentRef.instance.onCancel.subscribe((confirmEvent) => {
      event.confirm.reject();
      this.confirm.close();
    });
  }

  onDeleteRowConfirm(event: { data: TrayDto, confirm: Deferred }) {
    console.log('::Delete row::', event);
    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);

    this.confirm.componentRef.instance.onConfirm.subscribe((confirmEvent) => {
      this.dataService.deleteTray(event.data.objectId).subscribe(() => {
        event.confirm.resolve();
        this.confirm.close();
        this.toastrService.success('Successfully Deleted a Tray', `Deleting Tray`);
        this.immidiate();
      }, (err) => {
        event.confirm.reject();
        this.toastrService.danger('Failed deleting Tray', `Deleting Tray`);
      })
    });

    this.confirm.componentRef.instance.onCancel.subscribe((confirmEvent) => {
      event.confirm.reject();
      this.confirm.close();
    });
  }

  private immidiate() {
    setTimeout(() => {
      this.cd.detectChanges();
    }, 300);
  }
}
