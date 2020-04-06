import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLayersMyTrayRepositoriesModule } from '@my-tray/data-layers/mytray/repositories';
import { TagsService } from './tags';

@NgModule({
  imports: [CommonModule, DataLayersMyTrayRepositoriesModule],
  providers: []
})
export class DataServicesMytrayServicesModule {
  static forRoot(environment: any): ModuleWithProviders {
    return {
      ngModule: DataServicesMytrayServicesModule,
      providers: [
        TagsService,
        {
          provide: 'env',
          useValue: environment
        }
      ],
    }
  }
}
