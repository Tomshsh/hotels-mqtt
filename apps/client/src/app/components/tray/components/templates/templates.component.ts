import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TemplatesDataService } from '@my-tray/data-services/mytray/services';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { TemplateDto } from '@my-tray/api-interfaces';
import { NbDialogRef } from '@nebular/theme/components/dialog/dialog-ref';
import { ConfirmPromptDialogComponent } from '@my-tray/shared/layout';
import { TEMPLATE_COLUMNS } from '../../core/settings/template-columns';
import { takeUntil } from 'rxjs/operators';
import { Deferred } from 'ng2-smart-table/lib/lib/helpers';

@Component({
  selector: 'my-tray-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  loading: boolean;
  columns: any = TEMPLATE_COLUMNS;
  dataSource: TemplateDto[];

  private confirm: NbDialogRef<ConfirmPromptDialogComponent>;
  private confirmOptions = {
    hasBackdrop: true,
    closeOnBackdropClick: false,
    autoFocus: true,
    context: { content: 'Are you sure you want to do this?' }
  };

  constructor(private readonly dataService: TemplatesDataService,
              private readonly dialogService: NbDialogService,
              private readonly toastrService: NbToastrService,
              private readonly cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.dataService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((source: TemplateDto[]) => {
        this.dataSource = source;
        this.loading = false;
        this.immidiate();
      });
  }

  onCreateRowConfirm(event: { newData: TemplateDto, confirm: Deferred }) {
    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);
    this.confirm.componentRef.instance.onConfirm
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmEvent) => {
        this.dataService.create(event.newData)
          .pipe(takeUntil(this.destroy$))
          .subscribe((createdTemplate: TemplateDto) => {
            event.confirm.resolve();
            this.confirm.close();
            this.toastrService.success('Successfully created Template', `Creating Template`);
            this.immidiate();
          }, error => {
            event.confirm.resolve();
            this.confirm.close();
            this.toastrService.danger('Failed creating Template', `Creating Template`);
          });
      });


    this.confirm.componentRef.instance.onCancel.subscribe((confirmEvent) => {
      event.confirm.reject();
      this.confirm.close();
    });
  }

  onEditRowConfirm(event: { newData: TemplateDto, confirm: Deferred }) {
    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);
    this.confirm.componentRef.instance.onConfirm
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmEvent) => {
        this.dataService.update({
          title: event.newData.title,
          products: event.newData.products,
          objectId: event.newData.objectId
        }).pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            event.confirm.resolve();
            this.confirm.close();
            this.toastrService.success('Successfully updated Template', `Updating Template`);
            this.immidiate();
          }, error => {
            event.confirm.resolve();
            this.confirm.close();
            this.toastrService.danger('Failed updating Template', `Updating Template`);
          });
      });

    this.confirm.componentRef.instance.onCancel.pipe(takeUntil(this.destroy$)).subscribe((confirmEvent) => {
      event.confirm.reject();
      this.confirm.close();
    });
  }

  onDeleteRowConfirm(event: { newData: TemplateDto, confirm: Deferred }) {
    console.log('::Delete row::', event);
    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);

    this.confirm.componentRef.instance.onConfirm.pipe(takeUntil(this.destroy$)).subscribe((confirmEvent) => {
      this.dataService.delete(event.newData.objectId).pipe(takeUntil(this.destroy$)).subscribe(() => {
        event.confirm.resolve();
        this.confirm.close();
        this.toastrService.success('Successfully Deleted a Template', `Deleting Template`);
        this.immidiate();
      }, (err) => {
        event.confirm.reject();
        this.toastrService.danger('Failed deleting Template', `Deleting Template`);
      })
    });

    this.confirm.componentRef.instance.onCancel.pipe(takeUntil(this.destroy$)).subscribe((confirmEvent) => {
      event.confirm.reject();
      this.confirm.close();
    });
  }

  private immidiate() {
    setTimeout(() => {
      this.cd.detectChanges();
    }, 300);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
