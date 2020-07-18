import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ui-custom-actions',
  templateUrl: './custom-actions.component.html',
  styleUrls: ['./custom-actions.component.css']
})
export class CustomActionsComponent implements ViewCell, OnInit, AfterViewInit, OnDestroy {
  @Input() value: string;
  @Input() rowData: any;

  buttons: number[] | string[]

  constructor() { }

  clickHandler(ref: HTMLButtonElement){
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
  }

  ngOnDestroy(): void{
  }


}
