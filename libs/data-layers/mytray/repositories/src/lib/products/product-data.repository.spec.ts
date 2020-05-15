import { TestBed } from '@angular/core/testing';

import { ProductDataRepository } from './product-data.repository';
import { Product } from '@my-tray/api-interfaces';

describe('ProductDataRepository', () => {
  let service: ProductDataRepository<Product>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDataRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
