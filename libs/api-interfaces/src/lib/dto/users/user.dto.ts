import { IUser } from "../../entities/users/user.interface";

export class UserDto implements IUser {
  readonly email: string;
  readonly username: string;
}
