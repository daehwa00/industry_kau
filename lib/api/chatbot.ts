import axios from "axios";
import Axios from "axios";
import qs from "qs";
import { ChatbotChattingResponseBody } from "../../types/api/chatbot";

export const getChatbotChatting = async (request: string, email: string) => {
  await axios({
    method: "post",
    url: "https://b64q7h7pw5.execute-api.ap-northeast-2.amazonaws.com/dev/createConsole",
    data: {
      request: request,
      email: email,
    },
    headers: { "x-api-key": "jr7VLmRJ20afbWdWusGlA3cEC1v94M5L2GKUE25C" },
  });
};

//axios.post('/api',{name:name},{headers:{Authorization:token}})
// export const getChatbotChatting = async (request: string, email: string) => {
//     const data = { request: request, email: email };
//     await Axios.post(
//       "https://b64q7h7pw5.execute-api.ap-northeast-2.amazonaws.com/dev/createConsole",
//       { request: request, email: email },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "X-API-KEY": "jr7VLmRJ20afbWdWusGlA3cEC1v94M5L2GKUE25C",
//         },
//       }
//     );
//   };
