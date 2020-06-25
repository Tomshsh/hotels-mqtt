import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { StateComponent } from './state.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthSessionQuery } from '@my-tray/shared/client/auth';
import { environment } from '@my-tray/shared/utilities/mocks';
import { TrayStateService } from '@my-tray/data-services/mytray/services';
import { Observable, of } from 'rxjs';
import { TrayStateDto } from '@my-tray/api-interfaces';
import { STATE_COLUMNS } from '../../core/settings';
import { MockedDataResponseArray } from './mocks/get-all-states.mock';


class TrayStateServiceMock {
  getAll(): Observable<TrayStateDto[]> {
    return of(MockedDataResponseArray);
  }
}

describe('StateComponent', () => {
  let component: StateComponent;
  let fixture: ComponentFixture<StateComponent>;
  let service: TrayStateService;
  const mockService = new TrayStateServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StateComponent],
      providers: [
        { provide: TrayStateService, useValue: mockService },
        { provide: NbDialogService, useValue: {} },
        { provide: NbToastrService, useValue: {} },
        ChangeDetectorRef,
        AuthSessionQuery,
        {
          provide: 'env',
          useValue: environment
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    service = TestBed.inject(TrayStateService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component life cycle', () => {
    it('should load data after the ngOnInit works properly', fakeAsync(() => {
      spyOn(service, 'getAll').and.returnValue(of(MockedDataResponseArray));
      spyOn(component, 'immidiate').and.callThrough();

      service.getAll().subscribe((entities) => {
        expect(entities).not.toBeNull();
        expect(entities.length).toBeGreaterThan(0);
      });
      component.ngOnInit();
      tick(300);
      expect(component.dataSource).not.toBeNull();
      expect(component.dataSource).toEqual(MockedDataResponseArray);
    }));

    it('should verify that ngOnDestroy is ran', () => {
      spyOn(component.destroy$, 'next').and.callThrough();
      spyOn(component.destroy$, 'complete').and.callThrough();

      component.ngOnDestroy();
      expect(component.destroy$.next).toBeCalled();
      expect(component.destroy$.complete).toBeCalled();

      expect(component.destroy$.next).toBeCalledTimes(1);
      expect(component.destroy$.complete).toBeCalledTimes(1);
    });

    it('should verify columns are defined', () => {
      expect(component.columns).toBeDefined();
      expect(component.columns).toEqual(STATE_COLUMNS);
    });
  });
});
