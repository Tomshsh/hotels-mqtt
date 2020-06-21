import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateFiltersComponent } from './state-filters.component';

describe('StateFiltersComponent', () => {
  let component: StateFiltersComponent;
  let fixture: ComponentFixture<StateFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateFiltersComponent ]
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
