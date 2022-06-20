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
  consolePostId: number;
  createdAt: string;
  updatedAt: string;
  status: "ACTIVE";
  contents: string;
  title: string;
  email: string;
  anonymous: number;
  mainCategory: string;
  subCategory: string;
  negative: number;
  positive: number;
  commentCount: number;
};
