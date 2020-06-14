import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { StatusComponent } from './status.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ChangeDetectorRef } from '@angular/core';
import { AuthSessionQuery } from '@my-tray/shared/client/auth';
import { environment } from '@my-tray/shared/utilities/mocks';

describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatusComponent],
      providers: [
        { provide: NbDialogService, useValue: {} },
        { provide: NbToastrService, useValue: {} },
        ChangeDetectorRef,
        AuthSessionQuery,
        {
          provide: 'env',
          useValue: environment
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when component is initializing', () => {
    it('should verify that immidiate function works properly', fakeAsync(() => {
      component.ngOnInit();
      tick(3);
      expect(component.loading).toBe(true);
    }));


    it('should load data after the ngOnInit', fakeAsync(() => {
    }));
  })
});
