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
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
        }),
      ],
      forms: {},
    }),

    NbEvaIconsModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    FormsModule
  ],
  declarations: [LoginPageComponent],
  exports: [RouterModule],
  providers: [NbAuthService, NbTokenService]
})
export class SharedClientAuthModule {
}
