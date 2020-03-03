import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbLayoutModule,
  NbThemeModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { FormsModule } from "@angular/forms";
import { NbAuthModule, NbAuthService, NbPasswordAuthStrategy, NbTokenService } from "@nebular/auth";
import { LoginPageComponent } from "./login/login-page.component";



@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbThemeModule.forRoot(),
    NbCheckboxModule,
    FormsModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
        }),
      ],
      forms: {},
    }),
  ],
  providers: [NbAuthService, NbTokenService],
  exports: []
})
export class ContainersModule { }
