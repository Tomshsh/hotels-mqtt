import { Component, OnInit } from '@angular/core';
import { COLUMNS } from './core';

@Component({
  selector: 'my-tray-cupboards',
  template: `
    <ui-data-grid [columns]='columns' ></ui-data-grid>
  `,
  styleUrls: ['./cupboards.component.css']
})
export class CupboardsComponent implements OnInit {

  columns = COLUMNS

  constructor() { }

  ngOnInit(): void {
  }

}
