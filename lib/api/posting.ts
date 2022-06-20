import axios from "axios";
import { number } from "prop-types";
import { PostingAPIBody, GetPostAPIBody } from "../../types/api/posting";

//* 글을 작성하는 api
export const postAPI = (body: PostingAPIBody) =>
  axios.post("/api/post/posting", body);

//* 글 리스트를 불러오는 api
export const getPostListAPI = (keyword: string, page = 0) =>
  axios.get<GetPostAPIBody[]>(
    `/api/post/getPostList?keyword=${keyword}&page=${page}`
  );

//* 추천 글 리스트를 불러오는 api
export const getRecommendPostListAPI = (email: string) =>
  axios.get<GetPostAPIBody[]>(
    `/api/post/getRecommendPostList?keyword=${email}`
  );

//* 포스팅 검색 api
export const searchWordAPI = (keyword: string) =>
  axios.get<{ results: string }[]>(`/api/post/getsearch?keyword=${keyword}`);
