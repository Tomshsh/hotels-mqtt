import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';

@Component({
  selector: 'ui-toggle-button-list',
  templateUrl: './toggle-button-list.component.html',
  styleUrls: ['./toggle-button-list.component.scss']
})
export class ToggleButtonListComponent implements OnInit {
  @Output() toggleChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onToggleChange($event: MatButtonToggleChange) {
    this.toggleChange.emit($event);
  }
}
