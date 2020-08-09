import { Component, OnInit } from '@angular/core';
import {INPUTS} from './core'

@Component({
  selector: 'my-tray-new-guest',
  template:`
    <ui-form [inputs]="inputs" (submit)="submit($event)"></ui-form>
  `,
  styleUrls: ['./new-guest.component.css']
})
export class NewGuestComponent implements OnInit {
  inputs = INPUTS

  constructor() { }

  ngOnInit(): void {
  }

  submit(e: Event){
    console.log(e)
  }

}
