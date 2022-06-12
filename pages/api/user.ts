import axios from ".";

//* 유저정보 받아오기
export const getUser = () => axios.get("/api/users/me");
