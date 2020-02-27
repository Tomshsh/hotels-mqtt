import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LoginPageComponent } from "./containers/login-page/login-page.component";

import { NbAuthComponent, NbAuthModule, NbAuthService, NbTokenService, } from "@nebular/auth";
import { NbIconModule, NbLayoutModule, NbThemeModule } from "@nebular/theme";
import { HttpClientModule } from "@angular/common/http";
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginFormComponent } from "./components/login/login-form.component";


export const sharedClientAuthRoutes: Route[] = [
  {
    path: 'auth', component: NbAuthComponent,
    children: [
      { path: '', component: LoginPageComponent },
      { path: 'login', component: LoginPageComponent },
    ]
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    NbLayoutModule,
    RouterModule.forRoot(sharedClientAuthRoutes),
    NbThemeModule.forRoot(),
    NbAuthModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule
  ],
  declarations: [LoginPageComponent, LoginFormComponent],
  exports: [RouterModule],
  providers: [NbAuthService, NbTokenService]
})
export class SharedClientAuthModule {
}
