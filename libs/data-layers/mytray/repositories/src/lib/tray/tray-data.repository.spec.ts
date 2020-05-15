import { TestBed } from '@angular/core/testing';

import { TrayDataRepository } from './tray-data.repository';
import { Tray } from '@my-tray/api-interfaces';

describe('TrayDataRepository', () => {
  let service: TrayDataRepository<Tray>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrayDataRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
