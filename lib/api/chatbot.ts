import axios from "axios";

//* 챗봇 대화
export const chatbotAPI = (body: { request: string; email: string }) =>
  axios.post("/api/chatbot/createConsole", body);
