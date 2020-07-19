import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsComponent } from './tags.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService, TagsService } from '@my-tray/data-services/mytray/services';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthSessionQuery } from '@my-tray/shared/client/auth';
import { environment } from '@my-tray/shared/utilities/mocks';

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        TagsService,
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
    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
