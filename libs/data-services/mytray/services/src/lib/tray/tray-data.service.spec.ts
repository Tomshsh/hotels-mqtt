import { TestBed } from '@angular/core/testing';

import { TrayDataService } from './tray-data.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '@my-tray/shared/utilities/mocks';

describe('TrayDataService', () => {
  let service: TrayDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        TrayDataService,
        {
          provide: 'env',
          useValue: environment
        }
      ]
    });
    service = TestBed.inject(TrayDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
