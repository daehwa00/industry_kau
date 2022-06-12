import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postType } from "../types/post";
import { PostState } from "../types/reduxState";

const initialState: PostState = {
  posts: [],
};

const posts = createSlice({
  name: "posts",
  initialState,

  reducers: {
    //* 포스트 리스트 설정하기
    setPosts(state, action: PayloadAction<postType[]>) {
      state.posts = action.payload;
    },
  },
});

export const postsActions = { ...posts.actions };

export default posts;
