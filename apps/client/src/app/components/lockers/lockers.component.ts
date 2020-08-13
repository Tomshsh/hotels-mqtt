import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { COLUMNS } from './core';
import { LockerDto } from '@my-tray/api-interfaces';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { ConfirmPromptDialogComponent } from '@my-tray/shared/layout';
import { LockersService } from '@my-tray/data-services/mytray/services';
import { Deferred } from 'ng2-smart-table/lib/lib/helpers';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'my-tray-cupboards',
  template: `
     <ui-data-grid
    [columns]='columns'
    [source]='dataSource'
    (createConfirm)="onCreateRowConfirm($event)"
    (deleteConfirm)="onDeleteRowConfirm($event)"
    (updateConfirm)="onEditRowConfirm($event)"
     ></ui-data-grid>
  `,
  styleUrls: ['./lockers.component.css']
})
export class LockersComponent implements OnInit {
  loading: boolean;
  columns = COLUMNS;
  dataSource: LockerDto[];

  private readonly destroy$ = new Subject<void>();
  private confirm: NbDialogRef<ConfirmPromptDialogComponent>;
  private confirmOptions = {
    hasBackdrop: true,
    closeOnBackdropClick: false,
    autoFocus: true,
    context: { content: 'Are you sure you want to do this?' }
  };

  constructor(
    private lockersService: LockersService,
    private cd: ChangeDetectorRef,
    private readonly dialogService: NbDialogService,
    private readonly toastrService: NbToastrService,
  ) { }


  private immidiate() {
    setTimeout(() => {
      this.cd.detectChanges();
    });
  }

  private newDataToObj(newData): LockerDto {
    return {
      id: newData.id,
      capacity: Number(newData.capacity),
      quantity: Number(newData.quantity),
      open: newData.open
    }
  }

  private handleSubOutcome(eventConfirm: Deferred,  error?: any) {
    eventConfirm.resolve();
    this.confirm.close();
    if (!error) {
      this.toastrService.success('Successfully updated', `Updating table`);
      this.loadDataSource()
    } else {
      this.toastrService.danger('Failed to update', `Updating Table`);
      console.error(error);
    }
  }

  onEditRowConfirm(event: { newData: any, confirm: Deferred }) {
    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);
    this.confirm.componentRef.instance.onConfirm
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmEvent) => {
        this.lockersService.update(this.newDataToObj(event.newData))
          .pipe(takeUntil(this.destroy$))
          .subscribe((val) => {
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

  onCreateRowConfirm(event: { newData: any, confirm: Deferred }) {
    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions)
    this.confirm.componentRef.instance.onConfirm
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmEvent) => {
        this.lockersService.createLocker(this.newDataToObj(event.newData))
          .pipe(takeUntil(this.destroy$))
          .subscribe(()=> {
            this.handleSubOutcome(event.confirm);

          }, error => {
            this.handleSubOutcome(event.confirm, error)
          })
      })
  }

  onDeleteRowConfirm(event: { data: LockerDto, confirm: Deferred }) {
    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);

    this.confirm.componentRef.instance.onConfirm.subscribe((confirmEvent) => {
      this.lockersService.delete(event.data.id)
        .subscribe(() => {
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


  private loadDataSource() {
    this.loading = true;
    this.lockersService.getLockers()
      .subscribe(workers => {
        this.dataSource = workers;
        this.immidiate();
        this.loading = false;
      })
  }

  ngOnInit(): void {
    this.loadDataSource();
  }

}
