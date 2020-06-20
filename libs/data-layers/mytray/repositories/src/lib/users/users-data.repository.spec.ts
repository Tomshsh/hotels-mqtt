import { getTestBed, TestBed } from '@angular/core/testing';

import { UsersDataRepository } from './users-data.repository';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IUser } from '@my-tray/api-interfaces';

describe('UsersRepositoryService', () => {
  let service: UsersDataRepository;
  let injector: TestBed;

  beforeEach(async () => {
    const fakeParse = {
      getUsers(): Promise<IUser[]> {
        return Promise.resolve([{ username: 'Genady' }, { username: 'Alex' }]);
      },
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: UsersDataRepository, useValue: fakeParse }
      ]
    });

    injector = getTestBed();
    service = TestBed.inject(UsersDataRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getUsers() return users from Parse', async () => {
    const users = await service.getUsers();
    expect(users).not.toBeNull();
    expect(users.length).toEqual(2);
  });

  it('should getUsers() fail when no results was returned', async () => {
    const getUsersMockFn = spyOn(service, 'getUsers')
      .and.returnValue(Promise.reject('No users were found'));

    service.getUsers().catch((err) => {
      expect(err).toEqual('No users were found');
    })

    expect(getUsersMockFn.calls.count()).toBe(1);
  });
});
