import axios from "axios";

export const getAllConsoles = async ({ body }) => {
  await axios({
    method: "post",
    url: "https://7f6calrfce.execute-api.ap-northeast-2.amazonaws.com/dev/getAllConsoles",
    data: {
      request: body.request,
      email: body.email,
    },
    headers: {
      "x-api-key": "T2obpw5w3w4dH4u6wo2Qr1QAqSgRCDxC2VvRqNN0",
    },
  });
};
