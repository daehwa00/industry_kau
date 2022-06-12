import axios from ".";

//포스트를 10개씩 끊어 가져옵니다.
export const getMcConsolePosts = async () => {
  await axios({
    method: "get",
    url:
      "https://7f6calrfce.execute-api.ap-northeast-2.amazonaws.com/dev/getMcConsolePosts?mainCategory=대분류2&page=0",
    headers: {
      "x-api-key": "Jkul4qNZJeatNGd9L8wdRj5qXqDhaog2FBJhtq4f",
    },
  });
};
