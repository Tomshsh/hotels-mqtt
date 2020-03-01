import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NbAuthComponent, NbAuthModule, NbAuthService, NbPasswordAuthStrategy, NbTokenService, } from "@nebular/auth";
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbLayoutModule,
  NbThemeModule
} from "@nebular/theme";
import { HttpClientModule } from "@angular/common/http";
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginPageComponent } from "./containers/login/login-page.component";
import { ContainersModule } from './containers/containers.module';


export const sharedClientAuthRoutes: Route[] = [
  {
    path: 'auth', component: NbAuthComponent,
    children: [
      { path: '', component: LoginPageComponent },
      { path: 'login', component: LoginPageComponent },
    ]
  },

];

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(sharedClientAuthRoutes),
    NbThemeModule.forRoot(),
    ContainersModule
  ],
  declarations: [],
  exports: [RouterModule]
})
export class SharedClientAuthModule {
}
