import { Component, OnInit } from '@angular/core';
import { COLUMNS } from './core';

@Component({
  selector: 'my-tray-cupboards',
  template: `
    <ui-data-grid [columns]='columns' ></ui-data-grid>
  `,
  styleUrls: ['./lockers.component.css']
})
export class LockersComponent implements OnInit {

  columns = COLUMNS

  constructor() { }

  ngOnInit(): void {
  }

}
