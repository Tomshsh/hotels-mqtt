import { BrowserModule } from '@angular/platform-browser';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './containers/dashboard/dashboard.component';

import { environment } from '@my-tray/env/client/environment';
import { SharedClientAuthModule } from '@my-tray/shared/client/auth';
import { SharedLayoutModule } from '@my-tray/shared/layout';
import { ConfigurationService, SharedUtilitiesModule } from '@my-tray/shared/utilities';
import { ComponentsModule } from './components/components.module';

export function initializer(configurationService: ConfigurationService) {
  return () => configurationService.initializeConfiguration(environment);
}

/*export function routesFactory(routesService: RoutesService, injector: Injector) {
  return () => {
    const router = injector.get<Router>(Router);
    routesService.getRoutesForLayout().subscribe((routes: RouteDto[]) => {
      routes.map((route: RouteDto) => {
        let component = routingComponents.get(route.component);
        if (!component) {
          component = null;
        }
        let addedRoute: Route;
        if (route.children.length > 0) {
          addedRoute = {
            path: route.path,
            component: component,
            canActivate: [AuthGuard]
          };
          addedRoute.children = route.children.map(childRoute => {
            const childRoutes: Route = {
              path: childRoute.path,
              component: routingComponents.get(childRoute.component) || null,
              redirectTo: childRoute.redirectTo || null,
              pathMatch: childRoute.pathMatch || null
            };
            return childRoutes;
          })
        }
        router.config.push(addedRoute);
      });
    });
  };
}*/
const routes: Routes = [
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    SharedClientAuthModule,
    SharedLayoutModule,
    SharedUtilitiesModule,
    ComponentsModule,
    RouterModule.forRoot(routes),
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializer,
    deps: [ConfigurationService],
    multi: true
  }],
  declarations: [DashboardComponent],
  bootstrap: [DashboardComponent]
})
export class AppModule {
}
