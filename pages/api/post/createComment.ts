import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log(req.body);
    if (!req.body) {
      res.statusCode = 400;
      return res.send("body 없습니다");
    }

    try {
      await axios({
        method: "post",
        url: "https://7f6calrfce.execute-api.ap-northeast-2.amazonaws.com/dev/createComment",
        headers: { "x-api-key": "Jkul4qNZJeatNGd9L8wdRj5qXqDhaog2FBJhtq4f" },
        data: req.body,
      });
      res.statusCode = 200;
      return res.end();
    } catch (e) {
      console.log(e);
    }
  }
};
