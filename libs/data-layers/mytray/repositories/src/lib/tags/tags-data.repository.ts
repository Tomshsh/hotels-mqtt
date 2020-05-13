import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { Pointer } from 'parse';
import { Product, Tag, TagDto } from '@my-tray/api-interfaces';
import moment from 'moment';
import { ProductDataRepository } from '../products';
import { Repository } from '../repository';

@Injectable({
  providedIn: 'root'
})
export class TagsRepository<T extends Tag> extends Repository<T> {

  constructor(private readonly productRepository: ProductDataRepository<Product>) {
    super();
  }

  async getTags(): Promise<Tag[]> {
    return await new Parse.Query(Parse.Object.extend('Tag'))
      .include('product')
      .find()
      .then((tags: any[]) => {
        return tags.map((tag): Tag => {
          const notResolvedTag = tag.toJSON();
          return {
            objectId: notResolvedTag.objectId,
            product: notResolvedTag.product,
            expDate: notResolvedTag.expiration_date.iso
          };
        });
      });
  }

  async deleteTag(objectId: string): Promise<void> {
    await new Parse.Query(Parse.Object.extend('Tag'))
      .get(objectId)
      .then((toBeDeleted: Parse.Object) => {
        toBeDeleted.destroy({});
      }, (err) => {
        throw new Error(err);
      });
  }

  async updateTag(updateTag: TagDto): Promise<Tag> {
    try {
      const tagForUpdate = await new Parse.Query(Parse.Object.extend('Tag'))
        .equalTo('objectId', updateTag.objectId)
        .first();

      const product = await this.productRepository.getProductById(updateTag.productObjectId);
      tagForUpdate.set('expiration_date', moment(updateTag.expDate).toDate());
      tagForUpdate.set('product', {
        __type: 'Pointer',
        objectId: product.objectId,
        className: 'Product'
      });
      await tagForUpdate.save()

      const tag = tagForUpdate.toJSON();
      return Promise.resolve({
        objectId: tag.objectId,
        product: tag.product,
        expDate: tag.expiration_date.iso
      });

    } catch (e) {
      return Promise.reject(e);
    }
  }
}
