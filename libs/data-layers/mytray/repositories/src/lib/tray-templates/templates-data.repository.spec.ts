import { TestBed } from '@angular/core/testing';

import { TemplatesDataRepository } from './templates-data.repository';
import { Template } from '@my-tray/api-interfaces';

describe('TemplatesDataService', () => {
  let service: TemplatesDataRepository<Template>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplatesDataRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
