import axios from "axios";
import { PostingAPIBody } from "../../types/api/posting";

export const postAPI = (body: PostingAPIBody) =>
  axios.post("/api/post/posting", body);
