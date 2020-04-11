import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `{{value}}`,
})
export class SelectListRendererComponent implements ViewCell, OnInit {
  @Input() value: string;
  @Input() rowData: any;

  constructor() {
  }

  ngOnInit() {
    this.value = this.rowData.productTitle;
  }
}
