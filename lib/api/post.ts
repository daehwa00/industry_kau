import axios from "axios";
import { postType } from "../../types/post";
import { commentType } from "../../types/comment";

//* 글을 하나를 불러오는 api
export const getPostAPI = (postID: number) =>
  axios.get<postType>(`/api/post/getpost/${postID}`);

export const createCommentAPI = (body: {
  contents: string;
  consolePostId: number;
  email: string;
  anonymous: number;
}) => axios.post("/api/post/createComment", body);

//* 글의 댓글 모두을 불러오는 api
export const getCommentsAPI = (postID: number) =>
  axios.get<commentType[]>(`/api/post/comments/${postID}`);

//* 힘내요 API
export const createCheerUpAPI = (body: {
  consolePostId: number;
  email: string;
}) => axios.post("/api/post/createCheerUp", body);
