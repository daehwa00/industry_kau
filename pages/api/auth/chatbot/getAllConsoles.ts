import axios from "axios";

export const getChatbotChatting = async (request: string, email: string) => {
  await axios({
    method: "post",
    url: "https://68kijysgv9.execute-api.ap-northeast-2.amazonaws.com/dev/createConsole",
    data: {
      request: request,
      email: email,
    },
    headers: {
      "Content-Type": "application/json",
      Connection: "keep-alive",
      "x-amzn-RequestId": "518cb00c-0d9a-4f6b-9308-915328f3003b",
      "x-amz-apigw-id": "S8YbnEbXIE0FhXQ=",
      "X-Amzn-Trace-Id": "Root=1-6294d44a-3e4561776e9ca6e41ca6d239;Sampled=0",
      "x-api-key": "prO410SER91p7T9ezPSzo8rbXU4gvqi6tfHPADY3",
    },
  });
};
