import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type writeState = {
  mainCategoryType: string | null;
  subCategoryType: string | null;
  anonymousType: string | null;
  email: string;
  title: string | null;
  contents: string | null;
};

//* 초기 상태
const initialState: writeState = {
  mainCategoryType: "", //* 대분류
  subCategoryType: "", //* 소분류
  anonymousType: "", //* 익명인지 아닌지
  email: "", //* 작성자
  title: "", //* 제목
  contents: "", //* 본문
};

const posting = createSlice({
  name: "posting",
  initialState,
  reducers: {
    //* 대분류 변경하기
    setMainCategoryType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.mainCategoryType = null;
      }
      state.mainCategoryType = action.payload;
      return state;
    },
    //* 소분류 변경하기
    setSubCategoryType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.subCategoryType = null;
      }
      state.subCategoryType = action.payload;
      return state;
    },

    //* 익명인지 아닌지
    setAnonymousType(
      state,
      action: PayloadAction<"anonymous" | "nickname" | "email">
    ) {
      state.anonymousType = action.payload;
      return state;
    },

    //* 제목 설정
    setTitle(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.title = null;
      }
      state.title = action.payload;
      return state;
    },

    //* 내용 설정
    setContents(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.contents = null;
      }
      state.contents = action.payload;
      return state;
    },
  },
});

export const postingActions = { ...posting.actions };

export default posting;
