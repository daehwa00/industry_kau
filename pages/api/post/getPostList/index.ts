import { NextApiResponse, NextApiRequest } from "next";
import axios from "axios";
import { useDispatch } from "react-redux";
import { postsActions } from "../../../../store/posts";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { keyword, page = 0 } = req.query;
    const search = keyword as string;
    console.log(search);

    if (!keyword) {
      res.statusCode = 400;
      return res.send("keyword가 없습니다.");
    }
    try {
      const { data } = await axios({
        method: "get",
        url: `https://7f6calrfce.execute-api.ap-northeast-2.amazonaws.com/dev/getMcConsolePosts?mainCategory=${encodeURI(
          search
        )}&page=${page}`,
        headers: { "x-api-key": "Jkul4qNZJeatNGd9L8wdRj5qXqDhaog2FBJhtq4f" },
      });

      res.statusCode = 200;
      return res.send(data);
    } catch (e) {
      res.statusCode = 404;
      return res.end("마지막 페이지입니다.");
    }
  }

  res.statusCode = 405;
  return res.end();
};
