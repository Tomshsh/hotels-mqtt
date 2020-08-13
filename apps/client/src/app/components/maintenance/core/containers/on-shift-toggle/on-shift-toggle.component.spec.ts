import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnShiftToggleComponent } from './on-shift-toggle.component';

describe('OnShiftToggleComponent', () => {
  let component: OnShiftToggleComponent;
  let fixture: ComponentFixture<OnShiftToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnShiftToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnShiftToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
