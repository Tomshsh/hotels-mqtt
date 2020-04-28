import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { SharedLayoutModule } from '@my-tray/shared/layout';
import { DevicesComponent } from './devices/devices.component';


@NgModule({
  declarations: [DevicesComponent],
  imports: [
    CommonModule,
    SharedLayoutModule,
    ComponentsRoutingModule
  ],
  providers: [
  ]
})
export class ComponentsModule {
}
