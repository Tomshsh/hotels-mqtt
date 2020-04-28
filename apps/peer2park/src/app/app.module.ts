import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';

import { Route, RouterModule } from '@angular/router';
import { DashboardContainerComponent, SharedLayoutModule } from '@my-tray/shared/layout';
import { DashboardComponent } from './containers/dashboard/dashboard.component';

import { environment } from '../environments/environment';
import { ConfigurationService, GlobalErrorHandler, SharedUtilitiesModule } from '@my-tray/shared/utilities';
import { AuthSessionQuery, AuthSessionService, SharedClientAuthModule } from '@my-tray/shared/client/auth';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';

export function initializer(configurationService: ConfigurationService) {
  return () => configurationService.initializeConfiguration(environment);
}

const routes: Route[] = [
  { path: 'dashboard', component: DashboardContainerComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedLayoutModule,
    SharedUtilitiesModule,
    SharedClientAuthModule.forRoot(),
    ComponentsModule,
    RouterModule.forRoot(routes),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    // RouterModule.forRoot(routes)
  ],
  exports: [HttpClientModule],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializer,
    deps: [ConfigurationService],
    multi: true
  },
  { provide: ErrorHandler, useClass: GlobalErrorHandler, deps: [AuthSessionService, AuthSessionQuery] }],
  bootstrap: [DashboardComponent]
})
export class AppModule {
}
