import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `{{value}}`,
})
export class SelectListRendererComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;

  constructor() {
  }

  ngOnInit() {
    if(this.value) {
      const { title } = this.value;
      if (title) {
        this.value = title;
      }
    }
  }
}

