import { TestBed } from '@angular/core/testing';

import { TagsRepository } from './tags-data.repository';
import { Tag } from '@my-tray/api-interfaces';

describe('TagsRepository', () => {
  let service: TagsRepository<Tag>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagsRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
