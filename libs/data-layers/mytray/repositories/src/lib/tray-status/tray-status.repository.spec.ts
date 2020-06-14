import { TestBed } from '@angular/core/testing';

import { TrayStatusRepository } from './tray-status.repository';
import { TrayStatus } from '@my-tray/api-interfaces';

describe('TrayStatusService', () => {
  let service: TrayStatusRepository<TrayStatus>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrayStatusRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getAll() statuses from database', async () => {
    const allStatuses = await service.getAll();
    expect(allStatuses).not.toBeNull();
  });
});
