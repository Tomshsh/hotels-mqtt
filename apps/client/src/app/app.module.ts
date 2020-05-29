import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Route, RouterModule } from '@angular/router';
import { AuthSessionQuery, AuthSessionService, SharedClientAuthModule } from '@my-tray/shared/client/auth';
import { DashboardContainerComponent, SharedLayoutModule } from '@my-tray/shared/layout';
import { ConfigurationService, GlobalErrorHandler, SharedUtilitiesModule } from '@my-tray/shared/utilities';
import { DataServicesMytrayServicesModule } from '@my-tray/data-services/mytray/services';

import { ComponentsModule } from './components/components.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';

import { environment } from '@my-tray/env/client/environment';

export function initializer(configurationService: ConfigurationService) {
  return () => configurationService.initializeConfiguration(environment);
}

const routes: Route[] = [
  { path: 'dashboard', component: DashboardContainerComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];


@NgModule({
  imports: [
    HttpClientModule,
    SharedLayoutModule,
    SharedUtilitiesModule,
    SharedClientAuthModule.forRoot(),
    ComponentsModule,
    RouterModule.forRoot(routes),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    DataServicesMytrayServicesModule.forRoot(environment)
  ],
  exports: [HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [ConfigurationService],
      multi: true
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler, deps: [AuthSessionService, AuthSessionQuery] }
  ],
  declarations: [DashboardComponent],
  bootstrap: [DashboardComponent]
})
export class AppModule {
}
