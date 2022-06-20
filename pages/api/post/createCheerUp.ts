import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import PostList from "../../searchBoard";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log(req.body);
    if (!req.body) {
      res.statusCode = 400;
      return res.send("postID 없습니다");
    }

    try {
      const result = await axios({
        method: "post",
        url: "https://7f6calrfce.execute-api.ap-northeast-2.amazonaws.com/dev/createCheerUp",
        headers: { "x-api-key": "Jkul4qNZJeatNGd9L8wdRj5qXqDhaog2FBJhtq4f" },
        data: req.body,
      });
      console.log(res.statusCode);
      console.log("result : ", result);
      console.log("HI");
      res.statusCode = 200;
      return res.send(result);
    } catch (e) {
      console.log(e.response.data);
    }
  }
};
