import { TestBed } from '@angular/core/testing';

import { RoomDataRepository } from './room-data.repository';

describe('RoomDataRepository', () => {
  let service: RoomDataRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomDataRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
