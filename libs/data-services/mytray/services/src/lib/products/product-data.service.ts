import { Injectable } from '@angular/core';
import { ProductDataRepository } from '@my-tray/data-layers/mytray/repositories';
import { Observable } from 'rxjs';
import { Product } from '@my-tray/api-interfaces';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private readonly productRepository: ProductDataRepository) {
  }

  getProducts(): Observable<Product | Product[]> {
    return fromPromise(this.productRepository.getProducts().then((products: Product[]): Product[] => {
      return products.map((product: Product): Product => {
        return {
          objectId: product.objectId,
          price: product.price,
          title: product.title
        }
      });
    }))
  }
}
