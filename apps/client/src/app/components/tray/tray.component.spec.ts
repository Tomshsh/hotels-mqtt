import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrayComponent } from './tray.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '@my-tray/data-services/mytray/services';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthSessionQuery } from '@my-tray/shared/client/auth';
import { environment } from '@my-tray/shared/utilities/mocks';

describe('TrayComponent', () => {
  let component: TrayComponent;
  let fixture: ComponentFixture<TrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrayComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
