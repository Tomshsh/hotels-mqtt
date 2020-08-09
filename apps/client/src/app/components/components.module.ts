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
import { StateComponent } from './tray/components/state/state.component';
import { ProductsComponent } from './products/products.component';
import { TemplatesComponent } from './tray/components/templates/templates.component';

import { SelectListRendererContextComponent } from './tags/components/select-list-renderer-context/select-list-renderer-context.component';
import { SelectRoomRendererComponent } from './tray/core/containers/select-room-renderer/select-room-renderer.component';
import { ProductsSelectionComponent } from './tray/core/containers/products-selection/products-selection.component';
import { StateFiltersComponent } from './tray/core/containers/state-filters/state-filters.component';

import { ComponentsRoutingModule } from './components-routing.module';
import { CupboardsComponent } from './cupboards/cupboards.component';
import { TowelsComponent } from './towels/towels.component';
import { NewGuestComponent } from './new-guest/new-guest.component';


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
  StateComponent,
  StateFiltersComponent
];

@NgModule({
  declarations: [...components, CupboardsComponent, TowelsComponent, NewGuestComponent],
  imports: [
    CommonModule,
    SharedLayoutModule,
    ComponentsRoutingModule
  ],
  providers: []
})
export class ComponentsModule {
}
