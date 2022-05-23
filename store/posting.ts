import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChangeEventHandler } from "react";

type writeState = {
  mainCategoryType: string | null; //게시판 분류
  subCategoryType: string | null;
  anonymousType: string | null;
  email: string;
  contents: string | null;
};

//* 초기 상태
const initialState: writeState = {
  //대분류
  mainCategoryType: null,
  //소분류
  subCategoryType: null,
  //익명인지 아닌지
  anonymousType: null,
  //작성자
  email: null,
  //본문
  contents: null,
};

const posting = createSlice({
  name: "posting",
  initialState,
  reducers: {
    //대분류 변경하기
    setMainCategoryType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.mainCategoryType = null;
      }
      state.mainCategoryType = action.payload;
      return state;
    },
    //소분류 변경하기
    setSubCategoryType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.subCategoryType = null;
      }
      state.subCategoryType = action.payload;
      return state;
    },

    //익명인지 아닌지
    setAnonymousType(
      state,
      action: PayloadAction<"anonymous" | "nickname" | "email">
    ) {
      state.anonymousType = action.payload;
      return state;
    },

    //text 설정
    setText(state, action: PayloadAction<string>) {
      state.contents = action.payload;
    },
  },
});

export const postingActions = { ...posting.actions };

export default posting;
