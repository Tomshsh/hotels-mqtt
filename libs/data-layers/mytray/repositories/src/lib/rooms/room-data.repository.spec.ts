import { TestBed } from '@angular/core/testing';

import { RoomDataRepository } from './room-data.repository';
import { Room } from '@my-tray/api-interfaces';

describe('RoomDataRepository', () => {
  let service: RoomDataRepository<Room>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomDataRepository);
    spyOn(service, 'getRooms').and.returnValue(Promise.resolve<Room[]>([
      { objectId: 'someObjectId', num: 1, isUtility: false, isOccupied: false, floor: 1, name: 'Test room1' }
    ]))
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return rooms[] getRooms', async () => {
    const rooms: Room[] = await service.getRooms();
    expect(rooms.length).toBeGreaterThan(0);
  });
});
