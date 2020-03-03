import { IUser } from "../../entities";

export class UserDto implements IUser {
  readonly username: string;
}
