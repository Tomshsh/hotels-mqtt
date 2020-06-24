import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TrayStateDto } from '@my-tray/api-interfaces';
import { TrayStateService } from '@my-tray/data-services/mytray/services';
import { finalize, takeUntil } from 'rxjs/operators';
import { Deferred } from 'ng2-smart-table/lib/lib/helpers';
import { STATE_COLUMNS } from '../../core/settings';
import { BaseGridViewComponent } from '../../../../core/classes/components';


@Component({
  selector: 'my-tray-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent extends BaseGridViewComponent<TrayStateDto> implements OnInit, OnDestroy {
  columns = STATE_COLUMNS;

  constructor(
    readonly service: TrayStateService,
    readonly dialogService: NbDialogService,
    readonly toastrService: NbToastrService,
    readonly cd: ChangeDetectorRef) {
    super(dialogService, toastrService, cd);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.service.getAll()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((states: TrayStateDto[]) => {
        this.dataSource = states;
      });
  }

  onCreateRowConfirm(event: { model: TrayStateDto; confirm: Deferred }) {
  }

  onDeleteRowConfirm(event: { model: TrayStateDto; confirm: Deferred }) {
  }

  onEditRowConfirm(event: { model: TrayStateDto; confirm: Deferred }) {
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}


