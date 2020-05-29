import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { Product } from '@my-tray/api-interfaces';
import { Repository } from '../repository';


@Injectable({
  providedIn: 'root'
})
export class ProductDataRepository<T extends Product> extends Repository<T> {
  private readonly ENTITY_NAME: string = 'Product';

  constructor() {
    super();
  }

  async getProducts(): Promise<Product[]> {
    return await new Parse.Query(Parse.Object.extend(this.ENTITY_NAME)).find()
      .then((products: any[]) => products.map((product): Product => {
        const productJson = product.toJSON();
        return {
          objectId: productJson.objectId,
          title: productJson.title,
          price: Number(productJson.price),
          currency: productJson.currency,
          abbr: productJson.shortName
        } as Product;
      }));
  }


  async getProductById(objectId: string): Promise<Product> {
    return await new Parse.Query(Parse.Object.extend(this.ENTITY_NAME))
      .equalTo('objectId', objectId)
      .first()
      .then((product) => {
        const productJson = product.toJSON();
        return {
          objectId: productJson.objectId,
          title: productJson.title,
          price: Number(productJson.price),
          currency: productJson.currency,
          abbr: productJson.shortName
        };
      });
  }


  async update(updateModel: T, modelName: string): Promise<T> {
    try {
      const updateEntity = await new Parse.Query(Parse.Object.extend(modelName))
        .equalTo('objectId', updateModel.objectId)
        .first();
      updateEntity.set('price', Number(updateModel.price));
      updateEntity.set('title', updateModel.title);
      updateEntity.set('currency', updateModel.currency);
      await updateEntity.save();

      const updatedEntity = {
        objectId: updateEntity.toJSON().objectId,
        currency: updateEntity.toJSON().currency,
        title: updateEntity.toJSON().title,
        price: updateEntity.toJSON().price,
        abbr: updateEntity.toJSON().shortName
      } as T;
      return await updatedEntity;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
