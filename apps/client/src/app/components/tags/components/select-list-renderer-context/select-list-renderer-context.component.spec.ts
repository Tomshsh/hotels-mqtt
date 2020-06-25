import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectListRendererContextComponent } from './select-list-renderer-context.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '@my-tray/shared/utilities/mocks';

describe('SelectListRendererContextComponent', () => {
  let component: SelectListRendererContextComponent;
  let fixture: ComponentFixture<SelectListRendererContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectListRendererContextComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: 'env', useValue: environment },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
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
