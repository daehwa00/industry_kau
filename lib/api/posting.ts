import axios from "axios";
import { PostingAPIBody, GetPostAPIBody } from "../../types/api/posting";

//* 글을 작성하는 api
export const postAPI = (body: PostingAPIBody) =>
  axios.post("/api/post/posting", body);

//* 글을 하나를 불러오는 api
export const getPostAPI = (keyword: string) => {
  axios.get(`/api/post/getpost?keyword=${keyword}`);
};

//* 글 리스트를 불러오는 api
export const getPostListAPI = (keyword: string) =>
  axios.get<GetPostAPIBody[]>(`/api/post/getPostList?keyword=${keyword}`);

//* 포스팅 검색 api
export const searchWordAPI = (keyword: string) =>
  axios.get<{ results: string }[]>(`/api/post/getsearch?keyword=${keyword}`);
