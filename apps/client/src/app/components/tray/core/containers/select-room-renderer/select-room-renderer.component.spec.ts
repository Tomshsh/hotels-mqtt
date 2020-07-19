import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRoomRendererComponent } from './select-room-renderer.component';
import { SelectListComponent } from '@my-tray/shared/layout';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

export class MockSelectListComponent {

}

export class MockCellComponent {

}

describe('SelectRoomRendererComponent', () => {
  let component: SelectRoomRendererComponent;
  let fixture: ComponentFixture<SelectRoomRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [SelectRoomRendererComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: SelectListComponent, useClass: MockSelectListComponent },
      ]
    }).compileComponents();
  }));

  /*beforeEach(() => {
    spyOn(component.cell, 'getRow');

    fixture = TestBed.createComponent(SelectRoomRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
