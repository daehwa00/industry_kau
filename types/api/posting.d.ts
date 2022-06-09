//* 포스팅 body
export type PostingAPIBody = {
  title: string;
  contents: string;
  email: string;
  anonymous: string;
  mainCategory: string;
  subCategory: string;
};

export type GetPostAPIBody = {
  mainCategory: string;
  pageNumber: number;
};
