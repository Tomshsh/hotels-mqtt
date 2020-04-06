import { TestBed } from '@angular/core/testing';
import { DevicesDataRepository } from './devices-data.repository';

describe('DevicesDataService', () => {
  let service: DevicesDataRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevicesDataRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
