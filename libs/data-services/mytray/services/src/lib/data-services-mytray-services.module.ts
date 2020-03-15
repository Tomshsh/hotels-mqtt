import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLayersMyTrayRepositoriesModule } from '@my-tray/data-layers/mytray/repositories';

@NgModule({
  imports: [CommonModule, DataLayersMyTrayRepositoriesModule],
  providers: []
})
export class DataServicesMytrayServicesModule {}
