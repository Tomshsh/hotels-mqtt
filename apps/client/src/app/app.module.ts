import { BrowserModule } from '@angular/platform-browser';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from "@angular/router";
import { AppComponent } from './app.component';

import { environment } from '@my-tray/env/client/environment';
import { SharedClientAuthModule } from '@my-tray/shared/client/auth';

const routes: Route[] = [{
  path: '',
  canActivateChild: [],
  redirectTo: '/',
  pathMatch: 'full'
}, {
  path: '**', redirectTo: '/'
}];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SharedClientAuthModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
