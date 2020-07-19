import { Inject, Injectable } from '@angular/core';
import { ProductDataRepository } from '@my-tray/data-layers/mytray/repositories';
import { Observable } from 'rxjs';
import { Product, ProductDto } from '@my-tray/api-interfaces';
import { fromPromise } from 'rxjs/internal-compatibility';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthSessionQuery } from '@my-tray/shared/client/auth';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseURL = `${ this.env.parse.serverURL }classes/`;

  constructor(private readonly repository: ProductDataRepository<Product>,
              private readonly httpClient: HttpClient,
              private readonly authQuery: AuthSessionQuery,
              @Inject('env') private readonly env: any) {
  }

  getProducts(): Observable<ProductDto[]> {
    return fromPromise(
      this.repository.getProducts().then((products: Product[]): ProductDto[] => {
        return products.map((product: Product): ProductDto => {
          return {
            objectId: product.objectId,
            title: product.title,
            price: product.price,
            currency: product.currency,
            abbr: product.shortName
          };
        });
      }));
  }

  create<R extends ProductDto>(newModel: R): Observable<R> {
    const body = {
      'objectId': newModel.objectId,
      'title': newModel.title,
      'price': Number(newModel.price),
      'currency': newModel.currency,
      'shortName': newModel.abbr,
      'ACL': this.authQuery.getAcl()[0].acl
    };

    return this.httpClient.post<R>(`${ this.baseURL }Product`, body, {
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('X-Parse-Session-Token', this.authQuery.getValue().token)
        .append('X-Parse-Application-Id', this.env.parse.appId)
    });
  }

  update(updateModel: ProductDto): Observable<ProductDto> {
    return fromPromise(
      this.repository.update({
        shortName: updateModel.abbr,
        title: updateModel.title,
        price: updateModel.price,
        currency: updateModel.currency,
        objectId: updateModel.objectId
      }, 'Product').then(
        (updatedModel: Product) => {
          return {
            objectId: updatedModel.objectId,
            currency: updatedModel.currency,
            price: updatedModel.price,
            title: updatedModel.title,
            abbr: updatedModel.shortName
          } as ProductDto;
        }
      )
    );
  }

  delete(objectId: string): Observable<void> {
    return fromPromise(
      this.repository.delete(objectId, 'Product')
    );
  }
}
