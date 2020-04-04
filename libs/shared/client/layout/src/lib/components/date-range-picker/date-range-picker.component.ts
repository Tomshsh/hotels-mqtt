import { Component, Input, OnInit } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ui-date-range-picker',
  template: `
    <span>
        <input nbInput
               [nbDatepicker]="datepicker"
               [(ngModel)]="inputModel"
               placeholder="{{placeholder}}"
               readonly
        />
    </span>
    <nb-datepicker #datepicker [hideOnSelect]="true"
                   [format]="format"></nb-datepicker>
  `,
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent extends DefaultEditor implements OnInit {
  @Input() placeholder = 'Please choose date';
  @Input() format: string;

  inputModel: Date;

  constructor() {
    super();
  }

  ngOnInit(): void {

  }
}


@Component({
  template: `{{value | date:'short'}} `,
})
export class DateRangePickerRenderComponent implements ViewCell, OnInit {
  @Input() value: string;
  @Input() rowData: any;

  constructor() {
  }

  ngOnInit() {
  }
}
