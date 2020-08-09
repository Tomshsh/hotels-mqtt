import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupboardsComponent } from './cupboards.component';

describe('CupboardsComponent', () => {
  let component: CupboardsComponent;
  let fixture: ComponentFixture<CupboardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupboardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
