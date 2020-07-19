import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ui-chips',
  template: `
    <mat-chip-list fxFill #chipList>
      <span *ngFor="let el of value">
        <mat-chip [ngClass]="el.color">
          {{el.title}}
          <mat-icon matChipRemove *ngIf="removable" (click)="onRemoveChip($event)">cancel</mat-icon>
        </mat-chip>
      </span>
    </mat-chip-list>
  `,
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements ViewCell, OnInit{
  @Input() value: any;
  @Input() rowData: any;
  @Input() removable: boolean;
  @Input() selectable: boolean;
  @Input() ariaLabel: string;
  @Input() id: string;

  @Output()
  onRemove: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {

  }

  onRemoveChip($event) {
    this.onRemove.emit($event);
  }
}
