import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Tag, TagDto } from '@my-tray/api-interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TagsRepository } from '@my-tray/data-layers/mytray/repositories';
import { AuthSessionQuery } from '@my-tray/shared/client/auth';

import moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private baseURL = `${ this.env.parse.serverURL }classes/`;

  constructor(private readonly tagsRepository: TagsRepository,
              private readonly httpClient: HttpClient,
              private readonly authQuery: AuthSessionQuery,
              @Inject('env') private readonly env: any) {
  }

  getTags(): Observable<TagDto[]> {
    return fromPromise(
      this.tagsRepository.getTags().then((tags: Tag[]): TagDto[] => {
        return tags.map(
          (tag: Tag): TagDto => {
            const thisTag = {
              objectId: tag.objectId,
              productPrice: tag.product?.price,
              productTitle: tag.product?.title,
              expDate: tag.expDate
            };
            console.log(thisTag);
            return thisTag;
          });
      })
    );
  }

  createTag(newTag: TagDto) {
    return this.httpClient.post(this.baseURL + 'Tag', {
      'objectId': newTag.objectId,
      'expiration_date': {
        '__type': 'Date',
        'iso': newTag.expDate
      },
      'product': {
        '__type': 'Pointer',
        'className': 'Product',
        'objectId': newTag.productTitle
      },
      'ACL': {
        'role': ''
      }
    }, {
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('X-Parse-Session-Token', this.authQuery.getValue().token)
        .append('X-Parse-Application-Id', this.env.parse.appId)
    });
  }

  updateTag(updateTag: TagDto): Observable<boolean> {
    return of(true);
    /*return fromPromise(
      this.tagsRepository.createTag(newTag).then((tag: Tag) => {
        return null;
      })
    );*/
  }

  deleteTag(objectId: string): Observable<void> {
    return fromPromise(
      this.tagsRepository.deleteTag(objectId).then(() => {
        // todo: refactor this after deleted
      })
    );
  }
}
