import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectListRendererComponent } from './select-list-renderer.component';

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
