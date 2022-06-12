import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { useDispatch } from "react-redux";
import { postsActions } from "../../../../store/posts";

//* redux-store에 넣고,
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { keyword } = req.query;
    if (!keyword) {
      res.statusCode = 400;
      return res.send("keyword가 없습니다");
    }

    try {
      const mainCategory = "대분류2";
      const pageNumber = 1;

      const { data } = await axios({
        method: "get",
        url: `https://7f6calrfce.execute-api.ap-northeast-2.amazonaws.com/dev/getMcConsolePosts?mainCategory=${encodeURI(
          mainCategory
        )}&page=${pageNumber}`,
        headers: { "x-api-key": "Jkul4qNZJeatNGd9L8wdRj5qXqDhaog2FBJhtq4f" },
      });
      console.log(data);
      console.log("들어감");
    } catch (e) {
      console.log(e);
    }
  }
};
