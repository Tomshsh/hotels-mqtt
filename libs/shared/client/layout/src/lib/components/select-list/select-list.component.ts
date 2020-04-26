import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
  selector: 'ui-select-list',
  template: `
    <nb-select [placeholder]="placeholder"
               [ngModel]="selectedItem"
               status="info"
               [(selected)]="selectedItem"
               [fullWidth]="true"
               (selectedChange)="updateSelected($event)"
               #selectComponent>
      <nb-option *ngFor="let option of rowData" [value]="option">
        {{ option.title }}
      </nb-option>
    </nb-select>

  `,
})
export class SelectListComponent extends DefaultEditor implements OnInit {
  @Input() placeholder: string;
  @Input() selectedItem;
  @Input() rowData: any[];
  @Output() itemSelect = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit(): void {
    // TODO: how to solve the select in table issue... the data inside the select should be pre-loaded,
    // TODO: Instead of loaded on demand.
  }

  updateSelected($event) {
    this.itemSelect.emit($event);
  }
}
