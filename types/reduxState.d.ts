import { postType } from "./post";

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

//* 포스트 redux state
export type PostState = {
  posts: postType[];
};

//* 포스트 검색 redux state
export type SearchPost = {
  mainCategory: string;
  pageNumber: number;
};
