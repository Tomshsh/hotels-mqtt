import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-toggle',
  template: `
    <nb-toggle [(checked)]="checked" (checkedChange)="onChange($event)" ></nb-toggle>
  `,
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit {

  @Input() checked: boolean
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onChange(e){
    this.checkedChange.emit(e)
  }

}
