import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardContainerComponent } from '@my-tray/shared/layout';
import { UsersComponent } from './users/users.component';
import { DevicesComponent } from './devices/devices.component';
import { CheckInComponent } from './reception/check-in/check-in.component';
import { CheckOutComponent } from './reception/check-out/check-out.component';
import { AuthGuard } from '@my-tray/shared/client/auth';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardContainerComponent ,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'devices', component: DevicesComponent },
      { path: 'checkin', component: CheckInComponent },
      { path: 'checkout', component: CheckOutComponent },
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
