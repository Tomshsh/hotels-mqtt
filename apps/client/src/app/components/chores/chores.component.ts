import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { COLUMNS } from './core/settings'
import { ChoresService } from '@my-tray/data-services/mytray/services';
import { NbDialogService, NbToastrService, NbDialogRef } from '@nebular/theme';
import { ChoreDto } from '@my-tray/api-interfaces';
import { Deferred } from 'ng2-smart-table/lib/lib/helpers';
import { ConfirmPromptDialogComponent } from '@my-tray/shared/layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'my-tray-chores',
  template: `
    <ui-data-grid
    [columns]='columns'
    [source]='dataSource'
    (createConfirm)="onCreateRowConfirm($event)"
    (deleteConfirm)="onDeleteRowConfirm($event)"
    (updateConfirm)="onEditRowConfirm($event)"
     ></ui-data-grid>
  ` ,
  styleUrls: ['./chores.component.css']
})
export class ChoresComponent implements OnInit {

  loading: boolean;
  columns = COLUMNS;
  dataSource: ChoreDto[];

  private readonly destroy$ = new Subject<void>();
  private confirm: NbDialogRef<ConfirmPromptDialogComponent>;
  private confirmOptions = {
    hasBackdrop: true,
    closeOnBackdropClick: false,
    autoFocus: true,
    context: { content: 'Are you sure you want to do this?' }
  };

  constructor(
    private choresService: ChoresService,
    private cd: ChangeDetectorRef,
    private readonly dialogService: NbDialogService,
    private readonly toastrService: NbToastrService,
  ) { }


  private immidiate() {
    setTimeout(() => {
      this.cd.detectChanges();
    });
  }

  private newDataToObj(newData): ChoreDto {
    return {
      id: newData.id,
      abbr: newData.abbr,
      title: newData.title,
      updatedAt: newData.updatedAt
    };
  }

  private handleSubOutcome(eventConfirm: Deferred, error?: any) {
    eventConfirm.resolve();
    this.confirm.close();
    if (!error) {
      this.toastrService.success('Successfully updated', `Updating table`);
      this.loadDataSource();
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
        this.choresService.updateChore(this.newDataToObj(event.newData))
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
    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);
    this.confirm.componentRef.instance.onConfirm
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmEvent) => {
        this.choresService.addChore(this.newDataToObj(event.newData))
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.handleSubOutcome(event.confirm);

          }, error => {
            this.handleSubOutcome(event.confirm, error);
          });
      });
  }

  onDeleteRowConfirm(event: { data: ChoreDto, confirm: Deferred }) {
    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);

    this.confirm.componentRef.instance.onConfirm.subscribe((confirmEvent) => {
      this.choresService.deleteChore(event.data.id)
        .subscribe(() => {
          this.handleSubOutcome(event.confirm)
        }, (err) => {
          event.confirm.reject();
          this.toastrService.danger('Failed to delete', `Deleting`);
        });
    });

    this.confirm.componentRef.instance.onCancel.subscribe((confirmEvent) => {
      event.confirm.reject();
      this.confirm.close();
    });
  }


  private loadDataSource() {
    this.loading = true;
    this.choresService.getChores()
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

