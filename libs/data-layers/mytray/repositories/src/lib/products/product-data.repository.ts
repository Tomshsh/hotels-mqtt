import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { Product } from '@my-tray/api-interfaces';


@Injectable({
  providedIn: 'root'
})
export class ProductDataRepository {
  private readonly ENTITY_NAME: string = 'Product';

  constructor() {
  }

  async getProducts(): Promise<Product[]> {
    return await new Parse.Query(Parse.Object.extend(this.ENTITY_NAME)).find()
      .then((products: any[]) => products.map((product): Product => {
        const productJson = product.toJSON();
        return {
          title: productJson.title,
          price: productJson.price,
          objectId: productJson.objectId
        };
      }));
  }


  async getProductById(objectId: string): Promise<Product> {
    return await new Parse.Query(Parse.Object.extend(this.ENTITY_NAME))
      .equalTo('objectId', objectId)
      .first()
      .then((product) => {
        const productJson = product.toJSON();
        return {
          title: productJson.title,
          price: productJson.price,
          objectId: productJson.objectId
        };
      });
  }
}
