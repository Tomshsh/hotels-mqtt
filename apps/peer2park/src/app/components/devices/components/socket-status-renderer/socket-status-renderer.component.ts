import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'p2p-socket-status-renderer',
  templateUrl: './socket-status-renderer.component.html',
  styleUrls: ['./socket-status-renderer.component.css']
})
export class SocketStatusRendererComponent
  implements ViewCell, OnInit, OnChanges {
  rowData: any;
  value: string;

  constructor() { }

  async ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
}
