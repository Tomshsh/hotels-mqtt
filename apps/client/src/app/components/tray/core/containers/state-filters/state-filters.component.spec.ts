import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateFiltersComponent } from './state-filters.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StateFiltersComponent', () => {
  let component: StateFiltersComponent;
  let fixture: ComponentFixture<StateFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateFiltersComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
