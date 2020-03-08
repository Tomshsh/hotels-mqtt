import { Injectable } from '@angular/core';
import { Credentials, Permissions, Role, UserDto } from '@my-tray/api-interfaces';
import { UsersRepository } from '../../repositories';
import { User } from 'parse';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository) {
  }

  logIn(credentials: Credentials) {
    const { email, password } = credentials;
    return fromPromise(this.usersRepository.logIn(email, password).then(async (user: User) => {
      const loggedInUser: UserDto = {
        roles: await this.usersRepository.getUserRoles().then((roles: string[]) => {
          return roles.map(role => Role[role])
        }),
        email: user.getEmail(),
        username: user.getUsername(),
        token: user.getSessionToken(),
        permissions: [Permissions.WRITE]
      };
      return loggedInUser;
    }));
  }


  async logOut() {
    await this.usersRepository.logOut();
  }

}
