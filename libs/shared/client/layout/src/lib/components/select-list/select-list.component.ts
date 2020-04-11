import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ui-select-list',
  template: `
    <nb-select [placeholder]="placeholder" status="info"
               [(selected)]="selectedItem"
               [fullWidth]="true"
               (selectedChange)="updateSelected($event)">
      <nb-option *ngFor="let option of rowData" [value]="option">
        {{ option.title }}
      </nb-option>
    </nb-select>
  `
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
   /* if (!this.selectedItem) {
      this.rowData.push({ value: '', title: 'Select Product' });
      this.selectedItem = this.rowData[0];
    }*/
  }

  updateSelected($event) {
    this.itemSelect.emit($event);
  }
}
