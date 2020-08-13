import { Component, OnInit } from '@angular/core';
import { DefaultEditor, ViewCell, Cell } from 'ng2-smart-table';

@Component({
  selector: 'my-tray-on-shift-toggle',
  template: `
    <ui-toggle [checked]="value" (checkedChange)="onChange($event)" ></ui-toggle>
  `,
  styleUrls: ['./on-shift-toggle.component.css']
})
export class OnShiftToggleComponent extends DefaultEditor implements OnInit, ViewCell {

  value
  rowData
  cell: Cell


  constructor() {
    super();
   }

  ngOnInit(): void {
    this.value = this.cell.getValue().value ? this.cell.getValue().value : false
    this.cell.setValue(this.value)
  }

  onChange(e){
    this.value = e
    this.cell.setValue(this.value)
  }

}
