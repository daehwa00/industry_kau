import axios from "axios";
import { PostDetail } from "../../types/reduxState";

//* 포스트 하나 불러오기
export const getPostDetailAPI = (postID: number) =>
  axios.get<PostDetail>(`api/post/${postID}`);
