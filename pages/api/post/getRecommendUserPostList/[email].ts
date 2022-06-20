import { NextApiResponse, NextApiRequest } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    console.log(" 닥ㅁ");
    const { email } = req.query;
    if (!email) {
      res.statusCode = 400;
      return res.send("email가 없습니다.");
    }

    try {
      console.log(email);
      const { data } = await axios({
        method: "get",
        url: `https://7f6calrfce.execute-api.ap-northeast-2.amazonaws.com/dev/console-post-user-recommend-container?email=${email}`,
        headers: { "x-api-key": "T2obpw5w3w4dH4u6wo2Qr1QAqSgRCDxC2VvRqNN0" },
      });
      res.statusCode = 200;
      return res.send(data);
    } catch (e) {
      console.log("ERROR");
      res.statusCode = 404;
      return res.send(e);
    }
  }
  res.statusCode = 405;

  return res.end();
};
