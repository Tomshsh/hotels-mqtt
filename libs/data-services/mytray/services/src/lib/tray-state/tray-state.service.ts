import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrayStateRepository } from '@my-tray/data-layers/mytray/repositories';
import { TrayStateEntity } from '@my-tray/api-interfaces/entities';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Product, ProductDto, TrayStateDto } from '@my-tray/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class TrayStateService {
  constructor(private repository: TrayStateRepository<TrayStateEntity>) {
  }

  getAll(): Observable<TrayStateDto[]> {
    return fromPromise(
      this.repository.getAll().then((states: TrayStateEntity[]) => {
        return states.map(state => {
          return {
            objectId: state.objectId,
            room: {
              objectId: state.room.objectId,
              floor: state.room.floor,
              num: state.room.num,
              name: state.room.name,
              isUtility: state.room.isUtility,
              isOccupied: state.room.isOccupied
            },
            tray: {
              isService: state.tray.isService,
              isOnline: state.tray.isOnline,
              title: state.tray.title,
              objectId: state.tray.objectId,
              template: {
                objectId: state.tray.template.objectId,
                products: state.tray.template.products.map((product: any) => {
                  return {
                    objectId: product.objectId,
                    price: product.price,
                    currency: product.currency,
                    abbr: product.shortName,
                    title: product.title
                  } as ProductDto;
                }),
                title: state.tray.template.title
              }
            }
          } as TrayStateDto;
        });
      })
    );
  }
}
