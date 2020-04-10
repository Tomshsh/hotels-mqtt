import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SelectListComponent } from '@my-tray/shared/layout';
import { ProductService } from '@my-tray/data-services/mytray/services';
import { Product } from '@my-tray/api-interfaces';

@Component({
  template: '<ui-select-list [rowData]="rowData"></ui-select-list>'
})
export class SelectListRendererContextComponent extends SelectListComponent implements OnInit {

  constructor(private readonly productService: ProductService,
              private readonly cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.rowData = products.map(prod => {
        return { value: prod.objectId, title: prod.title }
      });
    });
  }

}
