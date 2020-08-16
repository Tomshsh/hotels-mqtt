import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoreSelectionComponent } from './chore-selection.component';

describe('ChoreSelectionComponent', () => {
  let component: ChoreSelectionComponent;
  let fixture: ComponentFixture<ChoreSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoreSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoreSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
