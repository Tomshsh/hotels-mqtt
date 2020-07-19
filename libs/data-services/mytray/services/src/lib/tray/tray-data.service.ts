import { Inject, Injectable } from '@angular/core';
import { TrayDataRepository } from '@my-tray/data-layers/mytray/repositories';
import { Observable } from 'rxjs';
import { Product, ProductDto, ProductState, TagStateDto, Tray, TrayDto } from '@my-tray/api-interfaces';
import { fromPromise } from 'rxjs/internal-compatibility';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthSessionQuery } from '@my-tray/shared/client/auth';

@Injectable({
  providedIn: 'root'
})
export class TrayDataService {
  private baseURL = `${ this.env.parse.serverURL }classes/`;

  constructor(private readonly repository: TrayDataRepository<Tray>,
              private readonly httpClient: HttpClient,
              private readonly authQuery: AuthSessionQuery,
              @Inject('env') private readonly env: any) {
  }

  getAllTrays(): Observable<TrayDto[]> {
    return fromPromise(
      this.repository.getTrays().then((trays: Tray[]) => {
        return trays.map((tray: Tray) => {
          const newTrayDto: TrayDto = {
            objectId: tray.objectId,
            title: tray.title,
            isOnline: tray.isOnline,
            isService: tray.isService,
            room: {
              floor: tray.room?.floor,
              isOccupied: tray.room?.isOccupied,
              isUtility: tray.room?.isUtility,
              objectId: tray.room?.objectId,
              name: tray.room?.name,
              num: tray.room?.num,
            },
            template: {
              title: tray.template.title,
              objectId: tray.template.objectId,
              products: tray.template.products.map((product: Product) => {
                return {
                  objectId: product.objectId,
                  title: product.title,
                  abbr: product.shortName,
                  price: product.price,
                  currency: product.currency
                } as ProductDto;
              })
            },
            states: tray.states?.map((state: ProductState) => {
              return {
                lastAction: state.lastAction,
                updatedAt: state.updatedAt,
                tag: {
                  abbr: state.tag.product.shortName,
                  title: state.tag.product.title
                } as TagStateDto
              };
            })
          };
          return newTrayDto;
        })
      })
    );
  }

  createTray(newTray: TrayDto): Observable<TrayDto> {
    const body = {
      'objectId': newTray.objectId,
      'title': newTray.title,
      'isOnline': newTray.isOnline,
      'isService': newTray.isService,
      'room': {
        '__type': 'Pointer',
        'className': 'Room',
        'objectId': newTray.room.value
      },
      'ACL': this.authQuery.getAcl()[0].acl
    };

    return this.httpClient.post<TrayDto>(this.baseURL + 'Tray', body, {
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('X-Parse-Session-Token', this.authQuery.getValue().token)
        .append('X-Parse-Application-Id', this.env.parse.appId)
    });
  }

  updateTray(updateTray: TrayDto): Observable<TrayDto> {
    return fromPromise(
      this.repository.updateTray(updateTray).then((tray: Tray) => {
        return {
          objectId: tray.objectId,
          room: tray.room,
          title: tray.title,
          isOnline: tray.isOnline,
          isService: tray.isService
        } as TrayDto;
      })
    );
  }

  deleteTray(objectId: string): Observable<void> {
    return fromPromise(
      this.repository.deleteTray(objectId).then(() => {
        // todo: refactor this after deleted
      })
    );
  }
}
