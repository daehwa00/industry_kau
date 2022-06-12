import axios from "axios";
import { PostingAPIBody, GetPostAPIBody } from "../../types/api/posting";

//* 글을 작성하는 api
export const postAPI = (body: PostingAPIBody) =>
  axios.post("/api/post/posting", body);

//* 글을 불러오는 api
export const getpostAPI = (body) => axios.get("/api/post/getpost", body);
