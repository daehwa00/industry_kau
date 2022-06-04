import axios from "axios";

export const getChatbotChatting = async (request: string, email: string) => {
  await axios({
    method: "post",
    url: "https://7psvdxocg7.execute-api.ap-northeast-2.amazonaws.com/dev/createConsole",
    data: {
      request: request,
      email: email,
    },
    headers: { "x-api-key": "T2obpw5w3w4dH4u6wo2Qr1QAqSgRCDxC2VvRqNN0" },
  });
};
