import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const mainCategory = "대분류1";
    const pageNumber = 1;

    return await axios({
      method: "get",
      url: `https://7f6calrfce.execute-api.ap-northeast-2.amazonaws.com/dev/getMcConsolePosts?mainCategory=${encodeURI(
        mainCategory
      )}&page=${pageNumber}`,
      headers: { "x-api-key": "Jkul4qNZJeatNGd9L8wdRj5qXqDhaog2FBJhtq4f" },
    });
  } catch (e) {
    console.log(e);
    return res.end();
  }
};
