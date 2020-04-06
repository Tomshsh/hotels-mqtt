import { TestBed } from '@angular/core/testing';

import { ProductDataRepository } from './product-data.repository';

describe('ProductDataRepository', () => {
  let service: ProductDataRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDataRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
