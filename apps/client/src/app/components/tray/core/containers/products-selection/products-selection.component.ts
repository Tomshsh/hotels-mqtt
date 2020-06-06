import { Component, OnInit } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
import { ProductService } from '@my-tray/data-services/mytray/services';
import { Observable } from 'rxjs';
import { ProductDto } from '@my-tray/api-interfaces';

@Component({
  selector: 'my-tray-products-selection',
  templateUrl: './products-selection.component.html',
  styleUrls: ['./products-selection.component.scss']
})
export class ProductsSelectionComponent extends DefaultEditor implements OnInit, ViewCell {
  dataSource$: Observable<ProductDto[]>;

  rowData: any;
  value: string | number | any | any[];

  constructor(private readonly productService: ProductService) {
    super();
  }

  ngOnInit(): void {
    this.dataSource$ = this.productService.getProducts()
    this.value = this.cell.getValue() === '' ? [] : this.cell.getValue();
    if (this.value.length === 0) {
      this.cell.newValue = this.value;
    }
  }

  onAddProductListItem($event) {
    console.log('Update product list', $event);
    if (this.cell.newValue instanceof Array) {
      this.cell.newValue.push($event);
    }
  }


  onDeleteProductListItem($event) {
    console.log('Delete product list', $event);
    if (this.cell.newValue instanceof Array) {
      this.cell.newValue = $event;
    }
  }
}
