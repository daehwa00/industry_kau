import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types/UserType";
import { UserState } from "../types/reduxState";

// * 초기 상태
const initialState: UserState = {
  email: "",
  lastname: "",
  firstname: "",
  isLogged: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    //* 유저 변경하기
    setUser(state, action: PayloadAction<UserState>) {
      state = { ...action.payload, isLogged: true };
      return state;
    },
    //* 유저 초기화 하기
    initUser(state) {
      state = initialState;
      return state;
    },
  },
});

export const userActions = { ...user.actions };

export default user;
