import { NextApiResponse, NextApiRequest } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { postID } = req.query;
    if (!postID) {
      res.statusCode = 400;
      return res.send("postID가 없습니다.");
    }

    try {
      const { data } = await axios({
        method: "get",
        url: `https://7f6calrfce.execute-api.ap-northeast-2.amazonaws.com/dev/getComments?consolePostId=${postID}`,
        headers: { "x-api-key": "Jkul4qNZJeatNGd9L8wdRj5qXqDhaog2FBJhtq4f" },
      });
      res.statusCode = 200;
      return res.send(data);
    } catch (e) {
      res.statusCode = 404;
      return res.send(e);
    }
  }
  res.statusCode = 405;

  return res.end();
};
