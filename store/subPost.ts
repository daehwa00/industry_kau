import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postType } from "../types/post";
import { PostState } from "../types/reduxState";

export type subPostState = {
  subPosts: postType[];
};

const initialState = {
  subPosts: [],
};

const subPosts = createSlice({
  name: "subPosts",
  initialState,

  reducers: {
    //* 포스트 리스트 설정하기
    setsubPosts(state, action: PayloadAction<postType[]>) {
      state.subPosts = action.payload;
    },
  },
});

export const subPostsActions = { ...subPosts.actions };

export default subPosts;
