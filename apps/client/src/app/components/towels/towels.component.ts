import { Component, OnInit } from '@angular/core';
import { COLUMNS } from './core';

@Component({
  selector: 'my-tray-towels',
  template: `
    <ui-data-grid [columns]='columns' [actions]="true" ></ui-data-grid>
  `,
  styleUrls: ['./towels.component.css']
})
export class TowelsComponent implements OnInit {
  columns = COLUMNS

  constructor() { }

  ngOnInit(): void {
  }

}
