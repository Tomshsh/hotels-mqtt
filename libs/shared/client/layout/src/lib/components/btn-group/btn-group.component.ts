import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ui-btn-group',
  templateUrl: './btn-group.component.html',
  styleUrls: ['./btn-group.component.css']
})
export class BtnGroupComponent implements ViewCell,OnInit {
  @Input() value: string;
  @Input() rowData: any;
  @Input() btnCount: number

  constructor() { }

  ngOnInit(): void {
  }

}
