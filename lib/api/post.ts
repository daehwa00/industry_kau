import axios from "axios";
import { postType } from "../../types/post";
import { commentType } from "../../types/comment";

//* 글을 하나를 불러오는 api
export const getPostAPI = (postID: number) =>
  axios.get<postType>(`/api/post/getpost/${postID}`);

//* 글의 댓글을 불러오는 api
export const getCommentsAPI = (postID: number) =>
  axios.get<commentType[]>(`api/post/comments/${postID}`);
