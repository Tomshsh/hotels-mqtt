import { Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'ui-chips-autocomplete-form',
  template: `
    <mat-form-field class="chip-list" fxFill fxFlexFill>
      <mat-chip-list #chipList aria-label="Element selection">
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
          autofocus>
      </mat-chip-list>
      <mat-autocomplete #auto="matAutocomplete" (optionSelected)="onSelectionChanged($event)">
        <mat-option *ngFor="let entry of allEntries" [value]="entry">
          {{entry.abbr}}
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


  @ViewChild('formInput') formInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

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
    this.formInput.nativeElement.value = '';
    this.updateOnChange.emit(event.option.value);
    this.formControl.setValue(null);
  }

  private _filter(value: any): any[] {
    const filterValue = value?.title ?? value;
    return this.allEntries
      .filter(entry => entry.title
        .toLowerCase()
        .indexOf(filterValue.toLowerCase()) === 0);
  }
}

