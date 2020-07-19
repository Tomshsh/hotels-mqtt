import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TemplatesDataService } from '@my-tray/data-services/mytray/services';
import { TemplatesComponent } from './templates.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AuthSessionQuery } from '@my-tray/shared/client/auth';
import { environment } from '@my-tray/shared/utilities/mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TemplatesComponent', () => {
  let component: TemplatesComponent;
  let fixture: ComponentFixture<TemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ TemplatesComponent ],
      providers: [
        TemplatesDataService,
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
    fixture = TestBed.createComponent(TemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
