import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { NbDialogRef } from '@nebular/theme/components/dialog/dialog-ref';
import { ConfirmPromptDialogComponent } from '@my-tray/shared/layout';
import { TrayStatusDto } from '@my-tray/api-interfaces';


export class BaseComponent<T> implements OnInit, OnDestroy {
  private readonly destroy$: Subject<any> = new Subject<any>();
  public dataSource: T[];
  public columns: any;
  public loading: boolean;
  public confirm: NbDialogRef<ConfirmPromptDialogComponent>;


  private confirmOptions = {
    hasBackdrop: true,
    closeOnBackdropClick: false,
    autoFocus: true,
    context: { content: 'Are you sure you want to do this?' }
  };


  constructor(
    protected readonly dialogService: NbDialogService,
    protected readonly toastrService: NbToastrService,
    protected readonly cd: ChangeDetectorRef) {
  }

  protected immidiate() {
    setTimeout(() => {
      this.cd.detectChanges();
    }, 300);
  }

  ngOnInit(): void {
    this.loading = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  protected openDialog() {
    return this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);
  }

  protected success(title: string, message: string) {
    this.toastrService.success(message, title);
  }

  protected danger(title: string, message: string) {
    this.toastrService.danger(message, title);
  }
}

@Component({
  selector: 'my-tray-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent extends BaseComponent<TrayStatusDto> implements OnInit, OnDestroy {
  constructor(readonly dialogService: NbDialogService,
              readonly toastrService: NbToastrService,
              readonly cd: ChangeDetectorRef) {
    super(dialogService, toastrService, cd);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }


  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}


