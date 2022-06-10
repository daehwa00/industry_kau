import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    return res.send("hello NEXT!");
  }
  res.statusCode = 405;
  console.log(res.statusCode);
  return res.end();
};
