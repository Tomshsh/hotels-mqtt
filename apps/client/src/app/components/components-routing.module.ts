import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardContainerComponent } from '@my-tray/shared/layout';
import { UsersComponent } from './users/users.component';
import { DevicesComponent } from './devices/devices.component';
import { CheckInComponent } from './reception/check-in/check-in.component';
import { CheckOutComponent } from './reception/check-out/check-out.component';
import { AuthGuard } from '@my-tray/shared/client/auth';
import { TagsComponent } from './tags/tags.component';
import { TrayComponent } from './tray/tray.component';
import { ProductsComponent } from './products/products.component';
import { TemplatesComponent } from './tray/components/templates/templates.component';
import { RoomsComponent } from './rooms/rooms.component';
import { StatusComponent } from './status/status.component';

const routes: Routes = [{
  path: 'dashboard',
  component: DashboardContainerComponent,
  children: [
    { path: 'users', component: UsersComponent },
    { path: 'devices', component: DevicesComponent },
    { path: 'tags', component: TagsComponent },
    { path: 'check-in', component: CheckInComponent },
    { path: 'check-out', component: CheckOutComponent },
    { path: 'trays', component: TrayComponent },
    { path: 'templates', component: TemplatesComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'rooms', component: RoomsComponent },
    { path: 'status', component: StatusComponent }
  ],
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {
}
