import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectListRendererContextComponent } from './select-list-renderer-context.component';

describe('SelectListRendererContextComponent', () => {
  let component: SelectListRendererContextComponent;
  let fixture: ComponentFixture<SelectListRendererContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectListRendererContextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectListRendererContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
