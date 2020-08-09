import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-tray-new-guest',
  template:`
    <ui-form [inputs]="inputs" (submit)="submit($event)"></ui-form>
  `,
  styleUrls: ['./new-guest.component.css']
})
export class NewGuestComponent implements OnInit {
  inputs = [
    {label:"Guest name", input:"input", name:'guestName'},
    {label:"Room number", input:"select", required:true, name:'roomNo', selectOptions:[{value:'option 1', text:'option'}]},
    {label: "Language", input: "select", name:"lang", value:"HE", selectOptions:[{value:'HE', text:"Hebrew"}, {value:"EN", text:"English"}, {value:"RUS", text:"Russian"}]},
    {label:"Towel limit", input:"input", name:'towelLimit', type:'number'},
    {label:'card', input:'duplicatable', name:'cards' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  submit(e: Event){
    console.log(e)
  }

}
