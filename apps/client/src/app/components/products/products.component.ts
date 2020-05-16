import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '@my-tray/data-services/mytray/services';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbDialogRef } from '@nebular/theme/components/dialog/dialog-ref';
import { ConfirmPromptDialogComponent } from '@my-tray/shared/layout';
import { COLUMNS } from './core/settings';
import { ProductDto } from '@my-tray/api-interfaces';
import { Deferred } from 'ng2-smart-table/lib/lib/helpers';

@Component({
  selector: 'my-tray-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  private destroy$ = new Subject<void>();

  loading: boolean;
  columns: any = COLUMNS;
  dataSource: ProductDto[];

  private confirm: NbDialogRef<ConfirmPromptDialogComponent>;

  private confirmOptions = {
    hasBackdrop: true,
    closeOnBackdropClick: false,
    autoFocus: true,
    context: { content: 'Are you sure you want to do this?' }
  };

  constructor(private readonly dataService: ProductService,
              private readonly dialogService: NbDialogService,
              private readonly toastrService: NbToastrService,
              private readonly cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.dataService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products: ProductDto[]) => {
        this.dataSource = products;
        this.loading = false;
        this.immidiate();
      });
  }

  onCreateRowConfirm(event: { newData: ProductDto, confirm: Deferred }) {
    console.log('::Create row::', event);

    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);
    this.confirm.componentRef.instance.onConfirm
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmEvent) => {
        this.dataService.create(event.newData)
          .pipe(takeUntil(this.destroy$))
          .subscribe(createdProduct => {
            event.confirm.resolve();
            this.confirm.close();
            this.toastrService.success('Successfully created Product', `Creating Product`);
            this.immidiate();
          }, error => {
            event.confirm.resolve();
            this.confirm.close();
            this.toastrService.danger('Failed creating Product', `Creating Product`);
          });
      });

    this.confirm.componentRef.instance.onCancel.subscribe((confirmEvent) => {
      event.confirm.reject();
      this.confirm.close();
    });
  }

  onEditRowConfirm(event: { newData: ProductDto, confirm: Deferred }) {
    console.log('::Update row::', event);
    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);
    this.confirm.componentRef.instance.onConfirm
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmEvent) => {
        this.dataService.update(event.newData).subscribe((updatedModel: ProductDto) => {
          event.confirm.resolve();
          this.confirm.close();
          this.toastrService.success('Successfully updated Product', `Updating Product`);
          this.immidiate();
        }, error => {
          event.confirm.resolve();
          this.confirm.close();
          this.toastrService.danger('Failed updating Product', `Updating Product`);
        });
      });

    this.confirm.componentRef.instance.onCancel.subscribe((confirmEvent) => {
      event.confirm.reject();
      this.confirm.close();
    });
  }

  onDeleteRowConfirm(event: { data: ProductDto, confirm: Deferred }) {
    console.log('::Delete row::', event);
    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);
    this.confirm.componentRef.instance.onConfirm
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmEvent) => {
        this.dataService.delete(event.data.objectId).subscribe(() => {
          event.confirm.resolve();
          this.confirm.close();
          this.toastrService.success('Successfully Deleted a Product', `Deleting Product`);
          this.immidiate();
        }, (err) => {
          event.confirm.reject();
          this.toastrService.danger('Failed deleting Product', `Deleting Product`);
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
