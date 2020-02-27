import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DatabaseModule } from "@my-tray/database";
import { SharedClientAuthModule } from '@my-tray/shared/client/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DatabaseModule, SharedClientAuthModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
