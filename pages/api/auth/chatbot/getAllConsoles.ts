import axios from "axios";

export const getAllConsoles = async (request: string, email: string) => {
  await axios({
    method: "post",
    url: "https://68kijysgv9.execute-api.ap-northeast-2.amazonaws.com/dev/createConsole",
    data: {
      request: request,
      email: email,
    },
    headers: {
      "x-api-key": "T2obpw5w3w4dH4u6wo2Qr1QAqSgRCDxC2VvRqNN0",
    },
  });
};
