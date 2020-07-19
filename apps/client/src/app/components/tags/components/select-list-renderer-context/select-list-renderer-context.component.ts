import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewRef } from '@angular/core';
import { SelectListComponent } from '@my-tray/shared/layout';
import { ProductService } from '@my-tray/data-services/mytray/services';
import { Subject } from 'rxjs';
import { ViewCell } from 'ng2-smart-table';
import { finalize, takeUntil } from 'rxjs/operators';
import { ProductDto } from '@my-tray/api-interfaces';


@Component({
  template: `
    <ui-select-list (itemSelect)="onItemChanged($event)"
                    [selectedItem]="selectedItem"
                    [options]="options">
    </ui-select-list>
  `
})
export class SelectListRendererContextComponent extends SelectListComponent implements ViewCell, OnInit, OnDestroy {
  private readonly destroy$: Subject<any> = new Subject<any>();
  @Input() value: string | number;
  @Input() rowData: any;

  options: any[] = [{ value: '', title: 'Select Product', price: 0 }];

  constructor(readonly productService: ProductService,
              private readonly cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.selectedItem = this.options[0];
    this.productService.getProducts()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.updateImmidiate();
        })
      )
      .subscribe((products: ProductDto[]) => {
        this.options.push(
          ...products.map(product => {
            return { value: product.objectId, title: product.title, price: product.price };
          })
        );
        if (this.cell.newValue && String(this.cell.newValue).length > 0) {
          this.selectDefaultItem(this.cell.newValue);
        }
      });
  }


  onItemChanged($event) {
    this.selectedItem = $event;
    this.cell.newValue = $event;

    const priceCell = this.cell.getRow()
      .getCells()
      .find(x => x['column']['id'] === 'productPrice');
    priceCell.newValue = $event.price;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private selectDefaultItem(selectedItem: { value: string, title: string, price: number }) {
    if (selectedItem.title) {
      this.selectedItem =
        this.options.find((prod: ProductDto) => prod.title === selectedItem.title);
    } else {
      this.selectedItem =
        this.options.find((prod: ProductDto) => prod.title === String(selectedItem));
    }
  }

  private updateImmidiate() {
    setTimeout(() => {
      if (this.cd && !(this.cd as ViewRef).destroyed) {
        this.cd.detectChanges();
      }
    }, 300);
  }
}
