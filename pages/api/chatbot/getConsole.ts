import axios from "axios";

//해당 고민이 존재하는 경우 내용이 들어온다.
export const getAllConsoles = async ({ body }) => {
  await axios({
    method: "post",
    url: `https://7f6calrfce.execute-api.ap-northeast-2.amazonaws.com/dev/getConsole?consoleBotId=${body.ID}`,
    data: {
      request: body.request,
      email: body.email,
    },
    headers: {
      "x-api-key": "T2obpw5w3w4dH4u6wo2Qr1QAqSgRCDxC2VvRqNN0",
    },
  });
};
