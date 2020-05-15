import { TestBed } from '@angular/core/testing';

import { TagsService } from '@my-tray/data-services/mytray/services';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '@my-tray/shared/utilities/mocks';

describe('TagsService', () => {
  let service: TagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        TagsService,
        {
          provide: 'env',
          useValue: environment
        }
      ]
    });
    service = TestBed.inject(TagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
