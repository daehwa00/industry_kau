import { NextApiResponse, NextApiRequest } from "next";
import { searchData } from "../../../../lib/staticData";
import search from "../../../../store/search";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { keyword } = req.query;

    if (!keyword) {
      res.statusCode = 400;
      return res.send("keyword가 없습니다.");
    }

    try {
      //keyword를 가진 모든 searchData를 리턴한다.
      const results = searchData.filter((search) => search.includes(keyword));
      res.statusCode = 200;
      return res.send(results);
    } catch (e) {
      res.statusCode = 404;
      return res.end();
    }
  }

  res.statusCode = 405;
  return res.end();
};
