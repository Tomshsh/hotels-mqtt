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


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardContainerComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'devices', component: DevicesComponent },
      { path: 'tags', component: TagsComponent },
      { path: 'check-in', component: CheckInComponent },
      { path: 'check-out', component: CheckOutComponent },
      { path: 'trays', component: TrayComponent },
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {
}
