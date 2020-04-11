import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SelectListComponent } from '@my-tray/shared/layout';
import { ProductService } from '@my-tray/data-services/mytray/services';
import { Product } from '@my-tray/api-interfaces';

@Component({
  template: `
    <ui-select-list [rowData]="rowData"
                    (itemSelect)="loadProductPriceOnItemChanged($event)"
                    [selectedItem]="selectedItem">
    </ui-select-list>
  `
})
export class SelectListRendererContextComponent extends SelectListComponent implements OnInit {
  constructor(private readonly productService: ProductService,
              private readonly cd: ChangeDetectorRef) {
    super();
    this.rowData = [];
  }

  ngOnInit(): void {
    if (!this.cell.getRow().getData().productTitle) {
      this.rowData.push({ value: '', title: 'Select Product' });
      this.selectedItem = this.rowData[0];
    }
    this.productService.getProducts().subscribe((products: Product[]) => {
      const options = products.map(prod => {
        return { value: prod.objectId, title: prod.title, price: prod.price }
      });
      this.rowData.push(...options);

      if(!this.selectedItem) {
        this.selectedItem =
          this.rowData.find(product =>
            product.title === this.cell.getRow().getData().productTitle
          );
      }
      setTimeout(() => {
        this.cd.detectChanges();
      }, 0);
    });
  }

  loadProductPriceOnItemChanged($event) {
    this.selectedItem = $event;
    this.cell.newValue = $event.title;
    const priceCell = this.cell.getRow()
      .getCells()
      .find(x => x['column']['id'] === 'productPrice');
    priceCell.newValue = $event.price;
  }
}
