import { Component, OnInit } from '@angular/core';
import {INPUTS} from './core'
import { TowelsService, RoomDataService } from '@my-tray/data-services/mytray/services';
import { RoomTowelsDto, SelectRoomDto } from '@my-tray/api-interfaces';
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

  constructor(
    private towelsService: TowelsService,
    private readonly toastrService: NbToastrService,
    private roomService: RoomDataService) { }

  ngOnInit(): void {
    const roomNums = []

    this.roomService.getRooms().subscribe(rooms => {
      rooms.map(r => {
        roomNums.push({text: `${r.name}`, value: {name: r.name, id:r.objectId}})
      })
    })

    const roomInput = this.inputs.find(i => i.name === "room")
    roomInput.selectOptions = roomNums
  }

  submit(roomTowelsObj){
    roomTowelsObj.towelLimit = Number(roomTowelsObj.towelLimit)
    roomTowelsObj.currCount = 0
    this.towelsService.saveTowels(roomTowelsObj)
    .then(roomTowels => {
      this.toastrService.success('added '+roomTowels.get('guestName'))
    })
    .catch((err: Error) => {
      this.toastrService.danger(err.message)
    })
  }

}
