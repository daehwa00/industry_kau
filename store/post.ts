import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type postState = {
  postID: number;
  clicked: boolean | null;
};

//* 초기 상태
const initialState: postState = {
  postID: null,
  clicked: false,
};

const post = createSlice({
  name: "post",
  initialState,
  reducers: {
    //* 열리는 포스트 설정하기(고유 postID를 넘겨줌)
    setPostDetail(state, action: PayloadAction<number>) {
      state.postID = action.payload;
      state.clicked = true;
    },
  },
});

export const postActions = { ...post.actions };

export default post;
