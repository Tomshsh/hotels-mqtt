import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './guards';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpAuthErrorInterceptor } from './interceptors';
import { AuthClientServicesModule } from './services/auth-client-services.module';
import { ContainersModule } from './containers/containers.module';
import { AuthClientRoutingModule } from './routes/auth-client-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthClientRoutingModule,
    AuthClientServicesModule,
    ContainersModule,
  ],
  providers: [
    AuthGuard,
  ]
})
export class SharedClientAuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedClientAuthModule,
      providers: [
        AuthGuard,
        HttpAuthErrorInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpAuthErrorInterceptor,
          multi: true,
          deps: [Injector]
        }
      ]
    };
  }
}
