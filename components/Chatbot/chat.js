import { Chat } from "@progress/kendo-react-conversational-ui";
import { useState } from "react";
import styled from "styled-components";
import { chatbotAPI } from "../../lib/api/chatbot";

const Container = styled.div`
  display: flex;
  justify-content: right;
  align-items: bottom;
  .all {
    height: 65vh;
    width: 50vh;
    overflow: auto;
    box-sizing: border-box;
  }
`; // 어떻게 적용해야할지 아직 잘 모르겠음,, 위치 살짝 아래로 !

const user = {
  id: 1,
  // 시용자 아이콘 수정
  avatarUrl:
    "https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png",
};
const bot = {
  id: 0,
  // 봇 아이콘 수정
  avatarUrl:
    "https://w7.pngwing.com/pngs/358/978/png-transparent-chatbot-robot-computer-icons-internet-bot-robot-electronics-logo-cable.png",
};
const initialMessages = [
  {
    author: bot,
    //선택 응답
    suggestedActions: [
      {
        type: "reply",
        value: "aa",
      },
      {
        type: "reply",
        value: "bb",
      },
    ],
    timestamp: new Date(),
    text: "반가워요! 보고 싶었어요!",
  },
];

const Chatapp = (props) => {
  // 응답
  const countReplayLength = (text) =>
    new Promise(async (res) => {
      const email = "daehwa001210@gmail.com";
      const { data } = await chatbotAPI({ request: text, email });
      console.log("data : ", data);
      res(data);
    });

  const [messages, setMessages] = useState(initialMessages);
  //addNewMessage 메시지 타이핑
  const addNewMessage = (event) => {
    console.log("event message : ", event.message);
    let botResponse = Object.assign({}, event.message);
    setMessages([...messages, event.message]);

    countReplayLength(event.message.text).then(function(ret) {
      console.log("ret : ", ret);
      botResponse.text = ret; //보내는 메세지
      botResponse.author = bot;
      setMessages((oldMessages) => [...oldMessages, botResponse]);
    });
  };

  return (
    // link 수정 가능한 지
    <Container>
      <div>
        <link
          rel="stylesheet"
          href="https://kendo.cdn.telerik.com/themes/5.4.1/bootstrap/bootstrap-nordic.css"
        />
        <Chat // 답변 담아서 전송
          user={user}
          messages={messages}
          onMessageSend={addNewMessage}
          placeholder="입력해주세요!"
          className="all"
        />
      </div>
    </Container>
  );
};

// 위젯띄워서 사용 가능하면 좋겠음..
export default Chatapp;
