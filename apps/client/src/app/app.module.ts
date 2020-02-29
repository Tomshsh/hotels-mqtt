import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedClientAuthModule } from '@my-tray/shared/client/auth';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedClientAuthModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
