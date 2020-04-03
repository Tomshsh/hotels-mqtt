import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { Product } from '@my-tray/api-interfaces';


@Injectable({
    providedIn: 'root'
})
export class ProductDataRepository {
    constructor() {}

    async getProducts() : Promise<Product[]> {
      return await new Parse.Query(Parse.Object.extend('Product')).find()
          .then((products: any[]) => products.map((product) : Product => {
            const productJson = product.toJSON();
            return {
              title: productJson.title,
              price: productJson.price,
              objectId: productJson.objectId
            };
          }));
    }
}
