import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedClientAuthModule } from '@my-tray/shared/client/auth';
import { Route, RouterModule } from "@angular/router";

const routes: Route[] = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), SharedClientAuthModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
