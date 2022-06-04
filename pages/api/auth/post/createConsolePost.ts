import axios from "axios";

export const createConsolePost = async () => {
  await axios({
    method: "post",
    url: "https://7psvdxocg7.execute-api.ap-northeast-2.amazonaws.com/dev/createConsole",
    data: {
      request: "이게 인생일까요 ...",
      email: "james1212312312@naver.com",
    },
    headers: {
      "x-api-key": "XgSr4EZ5Xb71QJiy1UmwQ7nVvjswZJGb8cyYGzIQ",
    },
  });
};
