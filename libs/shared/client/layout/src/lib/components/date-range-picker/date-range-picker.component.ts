import { Component, Input, OnInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';
import { NbDateService } from '@nebular/theme';

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

  constructor(private dateService: NbDateService<Date>) {
    super();
  }

  ngOnInit(): void {
    if (!this.inputModel) {
      this.inputModel = this.cell.getValue();
      this.cell.newValue = this.inputModel;
    }
  }

  onDateChange($event) {
    this.cell.newValue = new Date($event).toJSON();
  }
}



