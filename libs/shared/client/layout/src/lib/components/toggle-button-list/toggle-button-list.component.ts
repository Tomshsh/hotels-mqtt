import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';

interface ToggleListItem {
  value: string;
  color: string;
}


@Component({
  selector: 'ui-toggle-button-list',
  templateUrl: './toggle-button-list.component.html',
  styleUrls: ['./toggle-button-list.component.scss']
})
export class ToggleButtonListComponent implements OnInit {
  @Output() toggleChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() source: ToggleListItem[] = [
    { value: 'Empty', color: '#ccc' },
    { value: 'InPlace', color: '#C7F6C7' },
    { value: 'Momentary', color: '#7FB17F' },
    { value: 'Charged', color: '#7F7FFF' },
    { value: 'VacantChange', color: '#FF7F7F' },
    { value: 'Replaced', color: '#FFCC7A' },
  ];

  constructor() {

  }

  ngOnInit(): void {
  }

  onToggleChange($event: MatButtonToggleChange) {
    this.toggleChange.emit($event);
  }
}
