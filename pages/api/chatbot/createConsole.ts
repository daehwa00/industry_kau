import { NextApiRequest, NextApiResponse } from "next";
import axios from "..";

//포스트를 10개씩 끊어 가져옵니다.
export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const { data } = await axios({
    method: "post",
    url: "https://7f6calrfce.execute-api.ap-northeast-2.amazonaws.com/dev/createConsole",
    data: req.body,
    headers: {
      "x-api-key": "Jkul4qNZJeatNGd9L8wdRj5qXqDhaog2FBJhtq4f",
    },
  });
  res.statusCode = 200;
  if (data.simRate < 0.6) {
    return res.send(
      "제가 답변드릴 수 없는 이야기 같아요ㅠㅠ 게시판에서 고민을 나눠봐요!"
    );
  }
  const result = data.response;

  return res.send(result);
};
