import { Inject, Injectable } from '@angular/core';
import { TemplatesDataRepository } from '@my-tray/data-layers/mytray/repositories';
import { Template, TrayDto } from '@my-tray/api-interfaces';
import { Observable } from 'rxjs';
import { TemplateDto } from '@my-tray/api-interfaces';
import { fromPromise } from 'rxjs/internal-compatibility';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthSessionQuery } from '@my-tray/shared/client/auth';

@Injectable({
  providedIn: 'root'
})
export class TemplatesDataService {
  private baseURL = `${ this.env.parse.serverURL }classes/`;

  constructor(private readonly repository: TemplatesDataRepository<Template>,
              private readonly authQuery: AuthSessionQuery,
              private readonly httpClient: HttpClient,
              @Inject('env') private readonly env: any) {
  }

  getAll(): Observable<TemplateDto[]> {
    return fromPromise(
      this.repository.getAll().then((templates: Template[]) => {
        return templates.map((template => {
          return {
            objectId: template.objectId,
            products: template.products.map(product => {
              return {
                objectId: product.objectId,
                currency: product.currency,
                price: product.price,
                abbr: product.shortName,
                title: product.title
              }
            }),
            title: template.title
          } as TemplateDto;
        }))
      })
    );
  }

  create(entity: TemplateDto): Observable<TemplateDto> {
    const productArray: any[] = [];
    for (const product of entity.products) {
      productArray.push({
        __type: 'Pointer',
        objectId: product.objectId,
        className: 'Product'
      });
    }
    const body = {
      'objectId': entity.objectId,
      'title': entity.title,
      'products': productArray,
      'ACL': this.authQuery.getAcl()[0].acl
    };

    return this.httpClient.post<TemplateDto>(this.baseURL + 'TrayTemplate', body, {
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('X-Parse-Session-Token', this.authQuery.getValue().token)
        .append('X-Parse-Application-Id', this.env.parse.appId)
    });
  }

  update(entity: TemplateDto): Observable<TemplateDto> {
    return fromPromise(
      this.repository.update(entity).then(updated => {
        return {
          objectId: updated.objectId,
          products: updated.products.map(product => {
            return {
              objectId: product.objectId,
              currency: product.currency,
              price: product.price,
              abbr: product.shortName,
              title: product.title
            }
          }),
          title: updated.title,
        } as TemplateDto;
      })
    );
  }

  delete(objectId: string): Observable<boolean> {
    return fromPromise(
      this.repository.delete(objectId, 'Template').then(() => {
        return true;
      }, (error) => {
        return false;
      })
    );
  }
}
