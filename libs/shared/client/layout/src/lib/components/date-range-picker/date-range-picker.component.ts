import { Component, Input, OnInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';
import moment from 'moment';

@Component({
  selector: 'ui-date-range-picker',
  template: `
    <input nbInput
           [nbDatepicker]="datepicker"
           [(ngModel)]="inputModel"
           placeholder="{{placeholder}}"
           readonly
    />
    <nb-datepicker #datepicker
                   [hideOnSelect]="true"
                   (dateChange)="onDateChange($event)">
    </nb-datepicker>
  `,
  styleUrls: ['./date-range-picker.component.scss']
})

export class DateRangePickerComponent extends DefaultEditor implements OnInit {
  @Input() placeholder = 'Please choose date';
  @Input() format = 'DD-MMM-YYYY';

  @Input() min: Date;
  @Input() max: Date;
  inputModel: Date;

  constructor() {
    super();
  }

  ngOnInit(): void {
    if (!this.inputModel) {
      this.inputModel = this.cell.getValue();
      this.cell.newValue = new Date(this.inputModel).toISOString();
    }
  }

  onDateChange($event) {
    this.cell.newValue = $event.toISOString();
  }
}
