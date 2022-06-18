import type { NextPage } from "next";
import styled from "styled-components";
import { getpostAPI } from "../lib/api/posting";
import Textra from "react-textra";

const Container = styled.div`
  font-size: 21px;
  color: gray;
  .context-wrapper {
    position: absolute;
    top: 45%;
    left: 15%;
    color: white;
    .first-context {
      font-size: 80px;
    }
    .second-context {
      margin-top: 10px;
      font-size: 68px;
    }
    .third-context {
      margin-top: 20px;
      font-size: 20px;
    }

    .third-context {
      margin-top: 20px;
      font-size: 30px;
    }
  }
  .forth-context {
    position: absolute;
    top: 90%;
    left: 15%;
    color: white;
    font-weight: bold;
  }
`;

const Index: NextPage = () => {
  return (
    <Container>
      <div className="context-wrapper">
        <div className="first-context">
          모두에게 [
          <Textra
            effect="topDown"
            data={["기쁨", "행복", "웃음", "안정"]}
            duration={500}
          />
          ]이{" "}
        </div>
        <div className="second-context">찾아오는 그 순간까지</div>
        <div className="third-context">당신이 정말로 행복했으면 좋겠어요</div>
      </div>
      <div className="forth-context">산학 프로젝트</div>
    </Container>
  );
};

export default Index;
