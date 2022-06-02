import axios from "axios";

export const getChatbotChatting = async (request: string, email: string) => {
  await axios({
    method: "post",
    url: "https://7psvdxocg7.execute-api.ap-northeast-2.amazonaws.com/dev/createConsole",
    data: {
      request: request,
      email: email,
    },
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization",
      "x-api-key": "CwbbVRmF1Y9qmqdruWrw43SmTpwsUYVF5FVFBpdG",
    },
  });
};
