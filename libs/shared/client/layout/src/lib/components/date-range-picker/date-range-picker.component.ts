import { Component, Input, OnInit } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
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
                   (dateChange)="onDateChange()"
                   [format]="format">
    </nb-datepicker>
  `,
  styleUrls: ['./date-range-picker.component.scss']
})

export class DateRangePickerComponent extends DefaultEditor implements OnInit {
  @Input() placeholder = 'Please choose date';
  @Input() format = 'dd-MMM-yyyy';

  inputModel: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.inputModel = moment(Date.now()).format(this.format);
  }

  onDateChange() {
    if (this.inputModel) {
      this.cell.newValue = moment(this.inputModel).format(this.format);
    }
  }
}



