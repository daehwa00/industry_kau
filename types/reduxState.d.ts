//* 유저 redux state
export type UserState = {
  email: string;
  lastname: string;
  firstname: string;
  isLogged: boolean;
};

//* 공통 redux state
export type CommonState = {
  validateMode: boolean;
};
