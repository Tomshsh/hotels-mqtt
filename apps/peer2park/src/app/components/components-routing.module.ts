import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardContainerComponent } from '@my-tray/shared/layout';
import { AuthGuard } from '@my-tray/shared/client/auth';
import { DevicesComponent } from './devices/devices.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardContainerComponent,
    children: [
    {path:'devices', component: DevicesComponent}
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
