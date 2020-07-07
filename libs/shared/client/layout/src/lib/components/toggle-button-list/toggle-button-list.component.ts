import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';

interface ToggleListItem {
  readonly value: string;
  readonly color: string;
  readonly state: string;
}


@Component({
  selector: 'ui-toggle-button-list',
  templateUrl: './toggle-button-list.component.html',
  styleUrls: ['./toggle-button-list.component.scss']
})
export class ToggleButtonListComponent implements OnInit {
  @Output() toggleChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() source: ToggleListItem[] = [
    { value: 'Empty', color: '#ccc', state: 'empty' },
    { value: 'InPlace', color: '#C7F6C7', state: 'inplace' },
    { value: 'Momentary', color: '#7FB17F', state: 'momentary' },
    { value: 'Charged', color: '#7F7FFF', state: 'charged' },
    { value: 'VacantChange', color: '#FF7F7F', state: 'vcharge' },
    { value: 'Replaced', color: '#FFCC7A', state: 'replaced' },
  ];

  constructor() {

  }

  ngOnInit(): void {
  }

  onToggleChange($event: MatButtonToggleChange) {
    this.toggleChange.emit($event);
  }
}
