import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material';

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
  @ViewChild(MatButtonToggleGroup) filterList: MatButtonToggleGroup;

  @Output() toggleChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() source: ToggleListItem[] = [
    { value: 'Empty', color: '#ccc', state: 'empty' },
    { value: 'InPlace', color: '#C7F6C7', state: 'refill' },
    { value: 'Momentary', color: '#7FB17F', state: 'momentary' },
    { value: 'Charge', color: '#7F7FFF', state: 'charge' },
    { value: 'VacantChange', color: '#FF7F7F', state: 'vcharge' },
    { value: 'Replace', color: '#FFCC7A', state: 'replace' },
  ];

  ngOnInit(): void {
  }

  onToggleChange($event: MatButtonToggleChange) {
    this.toggleChange.emit(this.filterList.selected);
  }
}
