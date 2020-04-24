import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `{{value | date:'dd-MMM-yyyy' }}`,
})
export class DatepickerRendererComponent implements ViewCell, OnInit {
  @Input() value: string;
  @Input() rowData: any;

  constructor() {
  }

  ngOnInit() {
    console.log(this.value);
  }
}
