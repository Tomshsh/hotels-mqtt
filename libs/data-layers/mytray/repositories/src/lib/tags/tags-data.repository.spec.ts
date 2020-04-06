import { TestBed } from '@angular/core/testing';

import { TagsRepository } from './tags-data.repository';

describe('TagsRepository', () => {
  let service: TagsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagsRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});