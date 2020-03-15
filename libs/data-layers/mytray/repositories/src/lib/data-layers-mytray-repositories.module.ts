import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesDataRepository } from './devices/devices-data.repository';

@NgModule({
  imports: [CommonModule],
  providers: [DevicesDataRepository]
})
export class DataLayersMyTrayRepositoriesModule {}
