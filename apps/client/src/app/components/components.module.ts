import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { DevicesComponent } from './devices/devices.component';
import { ButtonViewComponent, UsersComponent } from './users/users.component';
import { CheckInComponent } from './reception/check-in/check-in.component';
import { CheckOutComponent } from './reception/check-out/check-out.component';
import { SharedLayoutModule } from '@my-tray/shared/layout';
import { TagsComponent } from './tags/tags.component';


@NgModule({
  declarations: [DevicesComponent, UsersComponent, ButtonViewComponent, CheckInComponent, CheckOutComponent, TagsComponent],
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
