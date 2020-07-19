import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
   <div style="text-align: center">
     <nb-icon status="{{value.status}}" icon="{{value.icon}}"
              [options]="{ animation: { type: 'zoom' } }">
     </nb-icon>
   </div>
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
