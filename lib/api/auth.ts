import { UserType } from "../../types/UserType";
import axios from ".";
import { LoginAPIBody } from "../../types/api/auth";

// 쿠키의 access_token의 유저 정보를 받아오는 api
export const meAPI = () => axios.get<UserType>("/api/auth/me");

//* 로그 아웃 api
export const logoutAPI = () => axios.delete("/api/auth/logout");

//* 로그인 api
export const loginAPI = (body: { email: string; password: string }) =>
  axios.post<UserType>("/api/auth/login", body);
