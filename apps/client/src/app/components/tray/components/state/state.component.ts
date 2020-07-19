import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TrayDto } from '@my-tray/api-interfaces';
import { TrayDataService } from '@my-tray/data-services/mytray/services';
import { finalize, takeUntil } from 'rxjs/operators';
import { STATE_COLUMNS } from '../../core/settings';
import { BaseComponent } from '../../../../core/classes/components';

@Component({
  selector: 'my-tray-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent extends BaseComponent<TrayDto> implements OnInit, OnDestroy {
  columns = STATE_COLUMNS;
  actions = false;

  constructor(
    readonly service: TrayDataService,
    readonly dialogService: NbDialogService,
    readonly toastrService: NbToastrService,
    readonly cd: ChangeDetectorRef) {
    super(dialogService, toastrService, cd);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.service.getAllTrays()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
        })
      ).subscribe((states: TrayDto[]) => {
        this.dataSource = states.filter(tray => !tray.isService);
        this.immidiate();
      });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}


