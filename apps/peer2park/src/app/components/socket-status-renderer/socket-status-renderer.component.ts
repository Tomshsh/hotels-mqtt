import { Component, OnInit, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import Parse from 'parse'
@Component({
  selector: 'p2p-socket-status-renderer',
  templateUrl: './socket-status-renderer.component.html',
  styleUrls: ['./socket-status-renderer.component.css']
})
export class SocketStatusRendererComponent implements ViewCell, OnInit, OnChanges, AfterContentInit {
  rowData: any
  value: any
  indicators: any
  active: boolean = false
  onInitFunction(){}

  constructor() { }

  async ngOnInit() {
    this.onInitFunction()
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  ngAfterContentInit() {
  }

}
