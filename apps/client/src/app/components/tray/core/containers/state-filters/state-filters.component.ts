import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DefaultFilter } from 'ng2-smart-table';

@Component({
  selector: 'my-tray-state-filters',
  templateUrl: './state-filters.component.html',
  styleUrls: ['./state-filters.component.scss']
})
export class StateFiltersComponent extends DefaultFilter implements OnInit, OnChanges {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
