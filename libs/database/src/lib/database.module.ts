import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRepository } from "./repositories/users/users-repository.service";

@NgModule({
  imports: [CommonModule],
  providers: [UsersRepository],
  exports: [
  ]
})
export class DatabaseModule {}
