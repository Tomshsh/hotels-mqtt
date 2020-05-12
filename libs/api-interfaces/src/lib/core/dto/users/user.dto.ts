import { Role, Permissions } from '../../enums';

export interface AclDto {
  readonly name: string;
  readonly acl: any;
}
export class UserDto {
  username: string;
  email: string;
  roles: string | string[] | Role | Role[];
  permissions: Permissions | Permissions[];
  token: string;
  acl: AclDto | AclDto[];
}
