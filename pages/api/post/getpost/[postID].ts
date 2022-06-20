import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { postType } from "../../../../types/post";

//* redux-store에 넣고,
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { postID } = req.query;

    if (!postID) {
      res.statusCode = 400;
      return res.send("postID 없습니다");
    }

    try {
      const { data } = await axios({
        method: "get",
        url: `https://7f6calrfce.execute-api.ap-northeast-2.amazonaws.com/dev/getConsolePostById?consolePostId=${postID}`,
        headers: { "x-api-key": "Jkul4qNZJeatNGd9L8wdRj5qXqDhaog2FBJhtq4f" },
      });
      console.log(data);

      res.statusCode = 200;
      return res.send(data[0]);
    } catch (e) {
      console.log(e);
    }
  }
};
