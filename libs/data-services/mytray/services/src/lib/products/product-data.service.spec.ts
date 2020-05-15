import { TestBed } from '@angular/core/testing';

import { ProductService } from './product-data.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '@my-tray/shared/utilities/mocks';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ProductService,
        {
          provide: 'env',
          useValue: environment
        }
      ]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
