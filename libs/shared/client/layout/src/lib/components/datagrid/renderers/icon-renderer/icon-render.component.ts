import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <nb-icon class="center" icon="{{value}}"
             [options]="{ animation: { type: 'zoom' } }">
    </nb-icon>
  `,
})
export class IconRendererComponent implements ViewCell, OnInit {
  @Input() value: string;
  @Input() rowData: any;

  constructor() {
  }

  ngOnInit() {
  }
}
