import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesComponent } from './devices/devices.component';
import { UsersComponent } from './users/users.component';
import { CheckInComponent } from './reception/check-in/check-in.component';
import { CheckOutComponent } from './reception/check-out/check-out.component';
import { SharedLayoutModule } from '@my-tray/shared/layout';
import { TagsComponent } from './tags/tags.component';

import { ComponentsRoutingModule } from './components-routing.module';

const components = [DevicesComponent, UsersComponent, CheckInComponent, CheckOutComponent, TagsComponent];

@NgModule({
  declarations: [...components],
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
