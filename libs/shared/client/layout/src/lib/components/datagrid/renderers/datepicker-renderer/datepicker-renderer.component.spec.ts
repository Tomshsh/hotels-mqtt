import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerRendererComponent } from './datepicker-render.component';

describe('DatepickerRendererComponent', () => {
  let component: DatepickerRendererComponent;
  let fixture: ComponentFixture<DatepickerRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
