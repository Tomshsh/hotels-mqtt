import { Component, OnInit } from '@angular/core';
import { ViewCell, DefaultEditor } from 'ng2-smart-table';

@Component({
  selector: 'my-tray-cards-selection',
  templateUrl: './cards-selection.component.html',
  styleUrls: ['./cards-selection.component.css']
})
export class CardsSelectionComponent extends DefaultEditor implements OnInit, ViewCell {

  rowData: any;
  value: string | number | any | any[];

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.value = !this.cell.getValue() ? [] : this.cell.getValue();
    if (this.value.length === 0) {
      this.cell.newValue = this.value;
    }
  }

  onAddProductListItem($event) {
    if (this.cell.newValue instanceof Array) {
      this.cell.newValue.push($event);
    }
  }

  onDeleteProductListItem($event) {
    if (this.cell.newValue instanceof Array) {
      this.cell.newValue = $event;
    }
  }
}



