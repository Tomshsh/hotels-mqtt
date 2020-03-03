import { Injectable } from '@angular/core';
import { Credentials } from '@my-tray/api-interfaces';
import { UsersRepository } from '../../repositories';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository) {
  }


  logIn(credentials: Credentials) {
    const { email, password } = credentials;

    this.usersRepository.logIn(email, password).then((user) => {
      console.log('Auth User', user.getUsername());
    });
  }
}
