import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsSelectionComponent } from './cards-selection.component';

describe('CardsSelectionComponent', () => {
  let component: CardsSelectionComponent;
  let fixture: ComponentFixture<CardsSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
