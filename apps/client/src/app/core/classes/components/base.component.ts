import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NbDialogRef } from '@nebular/theme/components/dialog/dialog-ref';
import { ConfirmPromptDialogComponent } from '@my-tray/shared/layout';
import { NbDialogService, NbToastrService } from '@nebular/theme';

export class BaseComponent<T> implements OnInit, OnDestroy {
  readonly destroy$: Subject<any> = new Subject<any>();
  dataSource: T[];
  columns: any;
  loading: boolean;
  protected confirm: NbDialogRef<ConfirmPromptDialogComponent>;

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

  immidiate() {
    setTimeout(() => {
      this.cd.detectChanges();
    }, 300);
  }
}
