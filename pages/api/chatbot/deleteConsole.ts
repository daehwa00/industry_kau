import axios from "axios";

export const getAllConsoles = async ({ body }) => {
  await axios({
    method: "delete",
    url: `https://7f6calrfce.execute-api.ap-northeast-2.amazonaws.com/dev/deleteConsole?consoleBotId=${body.ID}`,
    headers: {
      "x-api-key": "T2obpw5w3w4dH4u6wo2Qr1QAqSgRCDxC2VvRqNN0",
    },
  });
};
