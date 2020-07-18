import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketStatusRendererComponent } from './socket-status-renderer.component';

describe('SocketStatusRendererComponent', () => {
  let component: SocketStatusRendererComponent;
  let fixture: ComponentFixture<SocketStatusRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocketStatusRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketStatusRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
