import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagsRepository } from '@my-tray/data-layers/mytray/repositories';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Tag } from '@my-tray/api-interfaces';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(private readonly tagsRepository: TagsRepository) {}

  getTags(): Observable<Tag[]> {
    return fromPromise(
      this.tagsRepository.getTags().then((tags: any[]) => {
        return tags.map(
          (tag: any): Tag => {
            const notResolvedTag = tag.toJSON();
            return {
              objectId: notResolvedTag.objectId,
              product: notResolvedTag.product,
              expDate: moment(notResolvedTag.expiration_date).format('DD-MMM-YYYY')
            };
          }
        );
      })
    );
  }
}
