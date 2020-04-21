import { Role, Permissions } from '../../enums';

export class UserDto {
  username: string;
  email: string;
  roles: string | string[] | Role | Role[];
  permissions: Permissions | Permissions[];
  token: string;
  acl: string | string[];
}
