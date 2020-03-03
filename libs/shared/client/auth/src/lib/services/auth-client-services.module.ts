import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from "./users/users.service";


@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    UsersService
  ],
  exports: []
})
export class AuthClientServicesModule {
}
