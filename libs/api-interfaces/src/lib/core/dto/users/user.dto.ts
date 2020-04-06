import { Role, Permissions } from '../../enums';


export class UserDto {
  username: string;
  email: string;
  roles: Role | Role[];
  permissions: Permissions | Permissions[]; //todo: Add logic to db for permission-set (read/write/update/etc)
  token: string;
}
