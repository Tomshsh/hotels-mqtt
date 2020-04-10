import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
  selector: 'ui-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss']
})
export class SelectListComponent extends DefaultEditor implements OnInit {
  @Input() placeholder: string;
  @Input() rowData;

  @Output() itemSelect = new EventEmitter();
  value: string | number;

  constructor() {
    super();
  }

  ngOnInit(): void {
    console.log(this.cell)
  }

  onItemSelect(row) {
    this.itemSelect.emit(row);
  }
}
