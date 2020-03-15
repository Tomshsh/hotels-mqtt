import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-data-grid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss']
})
export class DatagridComponent implements OnInit {

  @Input()
  source: any[];

  @Input()
  setting: any;

  constructor() {
  }

  ngOnInit(): void {
  }
}
