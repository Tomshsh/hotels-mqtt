import { Component, OnInit } from '@angular/core';
import {INPUTS} from './core'
import { TowelsService } from '@my-tray/data-services/mytray/services';
import { RoomTowelsDto } from '@my-tray/api-interfaces';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'my-tray-new-guest',
  template:`
    <ui-form [inputs]="inputs" (formSubmit)="submit($event)"></ui-form>
  `,
  styleUrls: ['./new-guest.component.css']
})
export class NewGuestComponent implements OnInit {
  inputs = INPUTS

  constructor(private towelsService: TowelsService, private readonly toastrService: NbToastrService) { }

  ngOnInit(): void {
  }

  submit(e: RoomTowelsDto){
    this.towelsService.saveTowels(e)
    .then(roomTowels => {
      this.toastrService.success('added '+roomTowels.get('guestName'))
    })
    .catch((err: Error) => {
      this.toastrService.danger(err.message)
    })
  }

}
