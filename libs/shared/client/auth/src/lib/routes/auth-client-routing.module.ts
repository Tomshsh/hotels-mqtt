import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NbAuthComponent, } from '@nebular/auth';
import { LoginPageComponent } from '../containers/login/login-page.component';

export const AuthClientRoutes: Route[] = [{
  path: 'auth', component: NbAuthComponent,
  children: [
    { path: '', component: LoginPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'logout', component: LoginPageComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(AuthClientRoutes)],
  exports: [RouterModule],
})
export class AuthClientRoutingModule {
}
