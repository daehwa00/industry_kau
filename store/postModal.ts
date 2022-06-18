import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { commentType } from "../types/comment";
import { postType } from "../types/post";

export type postState = {
  postDetail: postType;
  comments: commentType[];
  clicked: boolean;
};

//* 초기 상태
const initialState: postState = {
  postDetail: null,
  comments: null,
  clicked: false,
};

const postModal = createSlice({
  name: "postModal",
  initialState,

  reducers: {
    //* 열리는 포스트 설정하기(고유 postID를 넘겨줌)
    setPostDetail(state, action: PayloadAction<postType>) {
      state.postDetail = action.payload;
      state.clicked = true;
    },

    setPostCommmets(state, action: PayloadAction<commentType[]>) {
      state.comments = action.payload;
    },

    setPostClicked(state) {
      state.clicked = true;
    },
  },
});

export const postModalActions = { ...postModal.actions };

export default postModal;
