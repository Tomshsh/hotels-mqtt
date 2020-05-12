import { TestBed } from '@angular/core/testing';

import { TrayDataRepository } from './tray-data.repository';

describe('TrayDataRepository', () => {
  let service: TrayDataRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrayDataRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
