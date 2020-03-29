import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TagsRepository } from '@my-tray/data-layers/mytray/repositories';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Tag, TagDto } from '@my-tray/api-interfaces';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(private readonly tagsRepository: TagsRepository) {
  }

  getTags(): Observable<TagDto[]> {
    return fromPromise(
      this.tagsRepository.getTags().then((tags: Tag[]): TagDto[] => {
        return tags.map(
          (tag: Tag): TagDto => {
            return {
              objectId: tag.objectId,
              productPrice: tag?.product?.price,
              productTitle: tag?.product?.title,
              expDate: moment(tag.expDate).format('DD-MMM-YYYY')
            };
          }
        );
      })
    );
  }

  createTag(newTag: TagDto): Observable<boolean> {
    return of(true);
  }
}
