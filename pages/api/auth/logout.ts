import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "DELETE") {
      //쿠키를 없애도록 설정 만료일을 변경합니다.
      res.setHeader(
        "Set-Cookie",
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httyonly"
      );
      res.statusCode = 204;

      return res.end();
    }
  } catch (e) {
    console.log(e);
    return res.send(e.message);
  }
  res.statusCode = 405;

  return res.end();
};
