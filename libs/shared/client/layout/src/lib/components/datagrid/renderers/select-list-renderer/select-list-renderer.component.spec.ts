import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectListRendererComponent } from '@my-tray/shared/layout';
import { createSpyObj } from '@my-tray/shared/utilities/testing';

describe('SelectListRendererComponent', () => {
  let component: SelectListRendererComponent;
  let fixture: ComponentFixture<SelectListRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectListRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectListRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
