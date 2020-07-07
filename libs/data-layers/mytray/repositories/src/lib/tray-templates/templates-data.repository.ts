import { Injectable } from '@angular/core';
import { Product, Template, TemplateDto } from '@my-tray/api-interfaces';
import { Repository } from '../repository';

import * as Parse from 'parse';
import { ProductDataRepository } from '../products';

@Injectable({
  providedIn: 'root'
})
export class TemplatesDataRepository<R extends Template> extends Repository<R> {

  constructor(private readonly productDataRepository: ProductDataRepository<Product>) {
    super();
  }

  async getAll(): Promise<Template[]> {
    return await new Parse.Query(Parse.Object.extend('TrayTemplate'))
      .include('products')
      .find()
      .then((templates) => {
        return templates.map(tmplt => {
          const template = tmplt.toJSON();
          return {
            objectId: template.objectId,
            title: template.title,
            products: template.products.map(product => {
              return {
                objectId: product.objectId,
                title: product.title,
                currency: product.currency,
                price: product.price,
                shortName: product.shortName
              } as Product;
            })
          } as Template;
        });
      });
  }


  async update(entity: TemplateDto): Promise<Template> {
    try {
      const updateEntity = await new Parse.Query(Parse.Object.extend('TrayTemplate'))
        .equalTo('objectId', entity.objectId)
        .first();
      updateEntity.set('title', entity.title);
      const productArray: any[] = [];
      for (const product of entity.products) {
        productArray.push({
          __type: 'Pointer',
          objectId: product.objectId,
          className: 'Product'
        });
      }
      updateEntity.set('products', productArray);
      await updateEntity.save();

      const updatedProductsList: Product[] = [];
      for (const updatedProduct of updateEntity.toJSON().products) {
        updatedProductsList.push(
          await this.productDataRepository.getProductById(updatedProduct.objectId)
        );
      }
      const resultEntity: Template = {
        objectId: updateEntity.toJSON().objectId,
        title: updateEntity.toJSON().title,
        products: updatedProductsList
      } as Template
      return Promise.resolve(resultEntity);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
