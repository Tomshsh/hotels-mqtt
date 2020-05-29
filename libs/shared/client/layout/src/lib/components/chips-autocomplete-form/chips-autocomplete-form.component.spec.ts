import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsAutocompleteFormComponent } from './chips-autocomplete-form.component';

describe('ChipsAutocompleteFormComponent', () => {
  let component: ChipsAutocompleteFormComponent;
  let fixture: ComponentFixture<ChipsAutocompleteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsAutocompleteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsAutocompleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
