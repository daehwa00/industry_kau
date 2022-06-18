import { HYDRATE, createWrapper, MakeStore } from "next-redux-wrapper";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import user from "./user";
import common from "./common";
import posting from "./posting";
import auth from "./auth";
import posts from "./posts";
import search from "./search";
import postModal from "./postModal";

const rootReducer = combineReducers({
  common: common.reducer,
  user: user.reducer,
  posting: posting.reducer,
  auth: auth.reducer,
  posts: posts.reducer,
  postModal: postModal.reducer,
  search: search.reducer,
});

//* 스토어의 타입
export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      return {
        ...state,
        ...action.payload,
      };
    }
    return state;
  }
  return rootReducer(state, action);
};

//* 타입 지원되는 커스텀 useSelector 만들기
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore = () => {
  const store = configureStore({
    reducer,
    devTools: true,
  });
  initialRootState = store.getState();
  return store;
};

export const wrapper = createWrapper(initStore);
