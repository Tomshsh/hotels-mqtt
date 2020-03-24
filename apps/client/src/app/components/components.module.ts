import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { DevicesComponent } from './devices/devices.component';
import { ButtonViewComponent, UsersComponent } from './users/users.component';
import { CheckInComponent } from './reception/check-in/check-in.component';
import { CheckOutComponent } from './reception/check-out/check-out.component';
import { SharedLayoutModule } from '@my-tray/shared/layout';


@NgModule({
  declarations: [DevicesComponent, UsersComponent, ButtonViewComponent, CheckInComponent, CheckOutComponent],
  imports: [
    CommonModule,
    SharedLayoutModule,
    ComponentsRoutingModule
  ]
})
export class ComponentsModule { }
