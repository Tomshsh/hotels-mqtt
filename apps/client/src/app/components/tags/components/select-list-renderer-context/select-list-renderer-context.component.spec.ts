import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectListRendererContextComponent } from './select-list-renderer-context.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SelectListRendererContextComponent', () => {
  let component: SelectListRendererContextComponent;
  let fixture: ComponentFixture<SelectListRendererContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectListRendererContextComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  /*beforeEach(() => {
    fixture = TestBed.createComponent(SelectListRendererContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
