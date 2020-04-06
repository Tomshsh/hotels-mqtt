import { TestBed } from '@angular/core/testing';

import { RoutesDataRepository } from './routes-data.repository';

describe('RoutesDataRepository', () => {
  let service: RoutesDataRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutesDataRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
