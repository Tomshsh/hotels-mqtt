import { Injectable } from '@angular/core';
import { UsersDataRepository } from '@my-tray/data-layers/mytray/repositories';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { UserDto } from '@my-tray/api-interfaces';
import { User } from 'parse';

@Injectable({
  providedIn: 'root'
})
export class UsersServices {

  // todo: logging aggregator
  constructor(private readonly usersRepository: UsersDataRepository) {
  }

  getUsers(): Observable<Partial<UserDto>[]> {
    return fromPromise(this.usersRepository.getUsers().then((users: User[]) => {
      return users.map(user => {
        const mappedUser: Partial<UserDto> = {
          token: user.id,
          username: user.getUsername(),
          email: user.getEmail()
        };
        return mappedUser;
      });
    }));
  }
}
