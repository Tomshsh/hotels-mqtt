import { TestBed } from '@angular/core/testing';

import { UsersRepository } from './users-repository.service';

describe('UsersRepository', () => {
  let service: UsersRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
