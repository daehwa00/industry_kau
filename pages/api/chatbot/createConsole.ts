import axios from "..";

//포스트를 10개씩 끊어 가져옵니다.
export default async ({ body }) => {
  await axios({
    method: "post",
    url:
      "https://7f6calrfce.execute-api.ap-northeast-2.amazonaws.com/dev/createConsole",
    data: {
      request: body.request,
      email: body.email,
    },
    headers: {
      "x-api-key": "Jkul4qNZJeatNGd9L8wdRj5qXqDhaog2FBJhtq4f",
    },
  });
};
