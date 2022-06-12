import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type searchState = {
  searchWord: string | null;
  pageNumber: number;
};

const initialState: searchState = {
  searchWord: "",
  pageNumber: 0,
};

const search = createSlice({
  name: "search",
  initialState,

  reducers: {
    //* mainCategory 변경하기
    setSearchWord(state, action: PayloadAction<string>) {
      state.searchWord = action.payload;
      return state;
    },

    //* pageNumber 변경하기
    setPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
      return state;
    },
  },
});

export const searchActions = { ...search.actions };

export default search;
