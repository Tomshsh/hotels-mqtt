import { IUser } from "./user.interface";

export class UserEntity implements IUser {
  email: string;
  username: string;
}
