import { TestBed } from '@angular/core/testing';

import { UsersDataRepository } from './users-data.repository';

describe('UsersRepositoryService', () => {
  let service: UsersDataRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersDataRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
