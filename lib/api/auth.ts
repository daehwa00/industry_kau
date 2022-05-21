// 쿠키의 access_token의 유저 정보를 받아오는 api
import { UserType } from "../../types/UserType";
import axios from ".";

export const meAPI = () => axios.get<UserType>("/api/auth/me");

//* 로그 아웃 api
export const logoutAPI = () => axios.delete("/api/auth/logout");
