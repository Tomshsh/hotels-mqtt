import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ContainersModule } from './containers/containers.module';
import { AuthClientRoutingModule } from './routes/auth-client-routing.module';
import { AuthGuard } from './guards';



@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    AuthClientRoutingModule,
    ContainersModule,
  ],
  declarations: [],
  exports: [],
  providers: [AuthGuard]
})
export class SharedClientAuthModule {
}
