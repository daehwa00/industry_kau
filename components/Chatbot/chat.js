import { Chat } from "@progress/kendo-react-conversational-ui";
import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: right;
  padding-right: 20px;
  padding-bottom: 10px;
  align-items: bottom;
  .all {
    height: 65vh;
    width: 50vh;
    overflow: auto;
    box-sizing: border-box;
    padding: 5px;
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
    text: "챗봇입니다.",
  },
];

const Chatapp = (props) => {
  const [messages, setMessages] = React.useState(initialMessages);
  //addNewMessage 메시지 타이핑
  const addNewMessage = (event) => {
    let botResponse = Object.assign({}, event.message);
    botResponse.text = countReplayLength(event.message.text);
    botResponse.author = bot;
    setMessages([...messages, event.message]);
    setTimeout(() => {
      setMessages((oldMessages) => [...oldMessages, botResponse]);
    }, 1000);
  };

  // 응답
  const countReplayLength = () => {
    const answer = "답변 종료";
    return answer;
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
          placeholder={"입력창"}
          className="all"
        />
      </div>
    </Container>
  );
};

// 위젯띄워서 사용 가능하면 좋겠음..
export default Chatapp;
