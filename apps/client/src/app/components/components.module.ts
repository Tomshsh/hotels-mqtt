import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesComponent } from './devices/devices.component';
import { UsersComponent } from './users/users.component';
import { CheckInComponent } from './reception/check-in/check-in.component';
import { CheckOutComponent } from './reception/check-out/check-out.component';
import { SharedLayoutModule } from '@my-tray/shared/layout';
import { TagsComponent } from './tags/tags.component';
import { TrayComponent } from './tray/tray.component';
import { RoomsComponent } from './rooms/rooms.component';
import { StatusComponent } from './status/status.component';
import { ProductsComponent } from './products/products.component';
import { TemplatesComponent } from './tray/components/templates/templates.component';

import { SelectListRendererContextComponent } from './tags/components/select-list-renderer-context/select-list-renderer-context.component';
import { SelectRoomRendererComponent } from './tray/core/containers/select-room-renderer/select-room-renderer.component';
import { ProductsSelectionComponent } from './tray/core/containers/products-selection/products-selection.component';

import { ComponentsRoutingModule } from './components-routing.module';


const components = [
  TrayComponent,
  ProductsComponent,
  DevicesComponent,
  UsersComponent,
  CheckInComponent,
  CheckOutComponent,
  TrayComponent,
  TemplatesComponent,
  TagsComponent,
  SelectRoomRendererComponent,
  SelectListRendererContextComponent,
  ProductsSelectionComponent,
  RoomsComponent,
  StatusComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    SharedLayoutModule,
    ComponentsRoutingModule
  ],
  providers: []
})
export class ComponentsModule {
}
