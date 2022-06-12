import axios from "axios";

//* 포스팅 검색 api
export const chatbotAPI = (body: { request: string; email: string }) =>
  axios.post("/api/chatbot/createConsole", body);
