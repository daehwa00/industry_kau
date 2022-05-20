import { UserType } from "./UserType";

//* 유저 redux state
export type UserState = UserType & {
  isLogged: boolean;
};
