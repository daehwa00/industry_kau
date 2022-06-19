import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.body);
    await axios({
      method: "post",
      url: "https://7f6calrfce.execute-api.ap-northeast-2.amazonaws.com/dev/createConsolePost",
      data: req.body,
      headers: { "x-api-key": "Jkul4qNZJeatNGd9L8wdRj5qXqDhaog2FBJhtq4f" },
    });

    return res.end();
  } catch (e) {
    console.log(e);
  }
};
