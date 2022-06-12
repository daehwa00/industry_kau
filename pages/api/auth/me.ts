import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const accessToken = req.headers.cookie;
      if (accessToken) {
        req.statusCode = 200;
        return res.send(accessToken);
      }
      res.statusCode = 400;
      return res.send("access_token이 없습니다.");
    } catch (e) {
      res.statusCode = 500;
      return res.send(e);
    }
  }
  res.statusCode = 405;
  return res.end();
};
