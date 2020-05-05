import { TestBed } from '@angular/core/testing';

import { TrayDataService } from './tray-data.service';

describe('TrayDataService', () => {
  let service: TrayDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrayDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
