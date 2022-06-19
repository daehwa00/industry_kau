import { NextPage } from "next";
import styled from "styled-components";
import User from "../../public/img/svg/posting/user/post-user.svg";
import UpArrow from "../../public/img/svg/posting/posting-up-arrow.svg";
import DownArrow from "../../public/img/svg/posting/posting-down-arrow.svg";
import Comment from "../../public/img/svg/posting/comment.svg";

const Container = styled.div`
  overflow: auto;
  font-size: 20px;
  text-align: left;
  color: #00004d;
  .likes {
    display: flex;
  }
  .line {
    height: 12px;
    box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.2);
  }
  .line2 {
    border: 0;
    height: 1px;
    margin-bottom: 10px;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0)
    );
  }
  .post-title {
    font-size: 30px;
    font-weight: 800;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .post-user {
    font-size: 15px;
    padding: 0;
    top: 0;
    font-weight: 400;
    margin-top: 30px;
    display: flex;
    .post-user-svg {
      width: 50px;
      height: 50px;
      align-items: center;
      margin-right: 10px;
    }
    .post-user-date {
      font-size: 13px;
      margin-top: 0;
      padding: 0;
      top: 0;
      font-weight: 200;
      margin-top: 20px;
    }
  }
  .post-content {
    margin-bottom: 6px;
    font-size: 18px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 5px;
  }
  .post-comment {
    font-size: 16px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const RightPost: NextPage = () => {
  return (
    <Container>
      <div className="post-title">제목입니다</div>
      <div className="post-user">
        <User className="post-user-svg" />
        Hong-gil-dong
        <div className="post-user-date">2022-03-01</div>
      </div>
      <div className="line" />
      <div className="post-content">
        내용입니다. 팝업제작, 날짜 위치 수정, 폰트 수정, 포스팅 로직 좌우배치 +
        애니메이션 추가, 폰트 크기, 뒷배경 애니메이션, 제목 디자인, 챗봇 강조
      </div>
      <div className="line2" />
      <div className="post-comment">
        <Comment />
        댓글 1
      </div>
    </Container>
  );
};

export default RightPost;
