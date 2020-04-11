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
                   (dateChange)="onDateChange()">
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

    if(!this.min) {
      this.min = new Date();
      this.min.setMinutes(Math.floor(this.min.getMinutes() / 15) * 15 );
    }

    if(!this.max) {
      this.max = new Date(this.min);
      this.max.setFullYear(this.min.getFullYear() + 1);
    }
  }

  ngOnInit(): void {
    if (!this.inputModel) {
      this.inputModel = this.min;
      this.cell.newValue = this.inputModel.toISOString();
    }
  }

  onDateChange() {
    if (this.inputModel) {
      this.cell.newValue = this.inputModel.toISOString();
      // this.cell.newValue = moment(this.inputModel).format(this.format);
    }
  }
}



