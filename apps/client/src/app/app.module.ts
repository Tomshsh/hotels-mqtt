import { BrowserModule } from '@angular/platform-browser';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { environment } from '@my-tray/env/client/environment';
import { SharedClientAuthModule } from '@my-tray/shared/client/auth';
import { SharedLayoutModule } from '@my-tray/shared/layout';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    BrowserModule,
    SharedClientAuthModule,
    SharedLayoutModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),

  ],
  providers: [],
  bootstrap: [DashboardComponent]
})
export class AppModule {
}

