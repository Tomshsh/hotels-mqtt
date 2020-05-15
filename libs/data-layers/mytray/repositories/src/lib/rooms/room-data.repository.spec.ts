import { TestBed } from '@angular/core/testing';

import { RoomDataRepository } from './room-data.repository';
import { Room } from '@my-tray/api-interfaces';

describe('RoomDataRepository', () => {
  let service: RoomDataRepository<Room>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomDataRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
