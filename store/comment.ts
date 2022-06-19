import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { string } from "prop-types";
import { commentType } from "../types/comment";

export type commentState = {
  comments: commentType[];
  inputComment: string;
};

//* 초기 상태
const initialState: commentState = {
  comments: [],
  inputComment: "",
};

const comment = createSlice({
  name: "comment",
  initialState,
  reducers: {
    //* comments 변경하기
    setcomments(state, action: PayloadAction<commentType[]>) {
      state.comments = action.payload;
    },
    setInputComment(state, action: PayloadAction<string>) {
      state.inputComment = action.payload;
    },
    setInitInputComment(state) {
      state.inputComment = "";
      return state;
    },
  },
});

export const commentActions = { ...comment.actions };

export default comment;
