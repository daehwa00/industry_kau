import { NextApiResponse, NextApiRequest } from "next";
import axios from "axios";
import { useDispatch } from "react-redux";
import { postsActions } from "../../../../store/posts";
import { postType } from "../../../../types/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const keyword = req.query;
    if (!keyword) {
      res.statusCode = 400;
      return res.send("email이 없습니다.");
    }
    try {
      const { data } = await axios({
        method: "get",
        url: `https://7f6calrfce.execute-api.ap-northeast-2.amazonaws.com/dev/console-post-user-recommend-container?email=${keyword}`,
        headers: { "x-api-key": "Jkul4qNZJeatNGd9L8wdRj5qXqDhaog2FBJhtq4f" },
      });
      delete data.similarity; //유사도는 제외시킴

      res.statusCode = 200;
      return res.send(data);
    } catch (e) {
      res.statusCode = 404;
      return res.end();
    }
  }

  res.statusCode = 405;
  return res.end();
};
