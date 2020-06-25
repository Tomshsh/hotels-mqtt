import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SelectListComponent } from '@my-tray/shared/layout';
import { ProductService } from '@my-tray/data-services/mytray/services';
import { Product } from '@my-tray/api-interfaces';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  template: `
    <ui-select-list [rowData]="rowData"
                    (itemSelect)="loadProductPriceOnItemChanged($event)"
                    [selectedItem]="selectedItem">
    </ui-select-list>
  `
})
export class SelectListRendererContextComponent extends SelectListComponent implements OnInit {
  private readonly destroy$: Subject<any> = new Subject<any>();
  // rowData: any[] = [];

  constructor(private readonly productService: ProductService,
              private readonly cd: ChangeDetectorRef) {
    super();
    // this.rowData.push({ value: '', title: 'Select Product', price: 0 });
  }

  ngOnInit(): void {
    /*if (!this.cell.getRow().getData().productTitle) {
      this.selectedItem = this.rowData[0];
    }

    this.productService.getProducts().pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        setTimeout(() => {
          this.cd.detectChanges();
        });
      })
    ).subscribe((products: Product[]) => {
      const options = products.map(prod => {
        return { value: prod.objectId, title: prod.title, price: prod.price }
      });
      this.rowData.push(...options);
      try {
        let { title } = this.cell.getRow().getData()?.productTitle;
        if (!title) {
          title = this.cell.getRow().getData().productTitle;
        }
        this.selectedItem =
          this.rowData.find((prod: Product) => prod.title === title);
        this.cell.newValue = this.selectedItem;
      } catch (e) {
        this.selectedItem = this.rowData[0];
      }
    });*/
  }

  loadProductPriceOnItemChanged($event) {
    this.selectedItem = $event;
    this.cell.newValue = $event;
    const priceCell = this.cell.getRow()
      .getCells()
      .find(x => x['column']['id'] === 'productPrice');
    priceCell.newValue = $event.price;
  }
}
