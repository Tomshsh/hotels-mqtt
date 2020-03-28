import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { Tag } from '@my-tray/api-interfaces';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TagsRepository {

  constructor() {
  }

  async getTags(): Promise<Tag[]> {
    return await new Parse.Query(Parse.Object.extend('Tag'))
      .include('product')
      .find().then((tags: any[]) => {
        return tags.map((tag): Tag => {
          const notResolvedTag = tag.toJSON();
          return {
            objectId: notResolvedTag.objectId,
            product: notResolvedTag.product,
            expDate: moment(notResolvedTag.expiration_date).format('DD-MMM-YYYY')
          };
        });
      });
  }
}
