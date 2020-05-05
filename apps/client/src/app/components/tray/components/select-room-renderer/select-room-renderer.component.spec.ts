import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRoomRendererComponent } from './select-room-renderer.component';

describe('SelectRoomRendererComponent', () => {
  let component: SelectRoomRendererComponent;
  let fixture: ComponentFixture<SelectRoomRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectRoomRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRoomRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
