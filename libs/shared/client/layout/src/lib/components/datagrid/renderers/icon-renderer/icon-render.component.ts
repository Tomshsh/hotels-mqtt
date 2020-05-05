import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <nb-icon class="center" status="{{value.status}}" icon="{{value.icon}}"
             [options]="{ animation: { type: 'zoom' } }">
    </nb-icon>
  `,
})
export class IconRendererComponent implements ViewCell, OnInit {
  @Input() value: any;
  @Input() rowData: any;

  constructor() {
  }

  ngOnInit() {
  }
}
