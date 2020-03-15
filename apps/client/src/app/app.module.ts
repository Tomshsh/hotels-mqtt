import { BrowserModule } from '@angular/platform-browser';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { environment } from '@my-tray/env/client/environment';
import { AuthGuard, SharedClientAuthModule } from '@my-tray/shared/client/auth';
import { DashboardContainerComponent, SharedLayoutModule } from '@my-tray/shared/layout';
import { ConfigurationService, SharedUtilitiesModule } from '@my-tray/shared/utilities';
import { DevicesComponent } from './components/devices/devices.component';
import { Route, RouterModule } from '@angular/router';

export function initializer(configurationService: ConfigurationService) {
  return () => configurationService.initializeConfiguration(environment);
}

const routes: Route[] = [
  {
    path: 'dashboard',
    component: DashboardContainerComponent,
    children: [
      { path: 'devices', component: DevicesComponent },
    ],
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    SharedClientAuthModule,
    SharedLayoutModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    SharedUtilitiesModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializer,
    deps: [ConfigurationService],
    multi: true
  }],
  declarations: [DashboardComponent, DevicesComponent],
  bootstrap: [DashboardComponent]
})
export class AppModule {
}

