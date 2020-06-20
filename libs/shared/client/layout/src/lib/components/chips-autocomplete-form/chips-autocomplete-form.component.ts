import { Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
import { FormControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatChipInputEvent
} from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'ui-chips-autocomplete-form',
  template: `
    <mat-form-field class="chip-list" fxFlexFill>

      <button nbButton (click)='openPanel($event)'
              fxLayout="row"
              fxFlex="8%"
              [style.height]="'2rem'"
              [style.margin-right]="'1rem'">
        <nb-icon icon="plus"></nb-icon>
      </button>

      <mat-chip-list #chipList aria-label="Element selection" fxLayout="row" fxFlex="92%" >
        <mat-chip
          *ngFor="let entry of entries"
          [selectable]="selectable"
          [removable]="removable"
          (removed)="remove(entry)">
          {{entry.abbr}}
          <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
        </mat-chip>
        <input
          placeholder="New entry..."
          #formInput
          [formControl]="formControl"
          [matAutocomplete]="auto"
          [matChipInputFor]="chipList"
          [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
        />
      </mat-chip-list>
      <mat-autocomplete #auto="matAutocomplete"
                        (optionSelected)="onSelectionChanged($event)">
        <mat-option *ngFor="let entry of allEntries" [value]="entry">
          {{entry.abbr}} - {{entry.title}}
        </mat-option>
      </mat-autocomplete>



    </mat-form-field>
  `,
  styleUrls: ['./chips-autocomplete-form.component.scss']
})
export class ChipsAutocompleteFormComponent implements OnInit {
  @Input() entries: any[] = [];
  @Input() selectable = true;
  @Input() removable = true;
  @Input() allEntries: any[];
  @Output() updateOnChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteOnChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  formControl = new FormControl();

  filteredElements$: Observable<any[]>;


  @ViewChild('formInput') formInputElement: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) formInput: MatAutocompleteTrigger;

  constructor() {
  }

  ngOnInit(): void {
    this.filteredElements$ = this.formControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      debounceTime(200),
      map((entry: any | null) => {
        return entry
          ? this._filter(entry)
          : this.allEntries.slice();
      })
    );
  }

  remove(entry: any): void {
    const index = this.entries.indexOf(entry);
    if (index >= 0) {
      this.entries.splice(index, 1);
      this.deleteOnChange.emit(this.entries);
    }
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent): void {
    this.formInputElement.nativeElement.value = '';
    this.updateOnChange.emit(event.option.value);
    this.formControl.setValue(null);
  }

  openPanel(evt: Event): void {
    evt.stopPropagation();
    this.formInput.openPanel();
  }

  private _filter(value: any): any[] {
    const filterValue = value?.title ?? value;
    return this.allEntries
      .filter(entry => entry.title
        .toLowerCase()
        .indexOf(filterValue.toLowerCase()) === 0);
  }
}

