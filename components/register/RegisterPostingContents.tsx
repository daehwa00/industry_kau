import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import palette from "../../styles/palette";
import Textarea from "../common/Textarea";
import RegisterPostingFooter from "./footer/RegisterPostingFooter";
import useValidateMode from "../../hooks/useValidateMode";
import { useSelector } from "../../store";
import { postAPI } from "../../lib/api/posting";
import { postingActions } from "../../store/posting";
import Button from "../common/Button";
import Link from "next/link";
import { NotificationContainer, PostingSuccess } from "../post/PostModal";
import router from "next/router";

const Container = styled.div`
  .subCategory {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 3vh;
  }
  height: 750px;
  width: 55%;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-top: 2vh;
    margin-bottom: 2vh;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-posting-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
  .register-posting-text-wrapper {
    width: 500px;
    font-size: 14px;
    margin-bottom: 16px;
  }
  .submit-button {
    display: flex;
    width: 100%;
    margin-top: 30px;
    .submit-button-post {
      margin-right: 50px;
      margin-left: 50px;
    }
  }
`;
interface IProps {
  prevHref?: string;
}
const RegisterPostingContents: React.FC<IProps> = ({ prevHref }) => {
  // let navigate = useNavigate();
  const dispatch = useDispatch();

  const { setValidateMode } = useValidateMode();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const validatePostingForm = () => {
    //* 인풋 값이 없다면
    if (!title || !contents) {
      return false;
    }
    return true;
  };

  const anonymous = useSelector((state) => state.posting.anonymousType);
  const mainCategory = useSelector((state) => state.posting.mainCategoryType);
  const subCategory = useSelector((state) => state.posting.subCategoryType);
  const email = useSelector((state) => state.user.email);

  //* 포스팅 폼 제출하기
  const onSubmitPosting = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidateMode(true);

    if (validatePostingForm()) {
      try {
        const postingBody = {
          title,
          contents,
          email,
          anonymous,
          mainCategory,
          subCategory,
        };
        await postAPI(postingBody);
        PostingSuccess();
        router.push("/searchBoard");
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container>
      <div className="subCategory">{subCategory}</div>
      <form onSubmit={onSubmitPosting}>
        <Textarea
          value={title}
          isValid={!!title}
          errorMessage="입력해줘요~"
          onChange={(e) => {
            setTitle(e.target.value);
            dispatch(postingActions.setTitle(e.target.value));
          }}
          type="title"
        />
        <h2>어떤 상황인지 자세히 말해볼래요?</h2>
        <h3>하고싶은 만큼 이야기해 봐요. 우리가 들어줄게요.</h3>
        <p className="register-posting-text-wrapper">
          당신의 이야기, 하고 싶은만큼 해요. 다 들어주려고, 여백을 많이
          내어뒀어요.
        </p>
        <div className="register-posting-text-wrapper">
          <Textarea
            value={contents}
            isValid={!!contents}
            errorMessage="입력해줘요~"
            onChange={(e) => {
              setContents(e.target.value);
              dispatch(postingActions.setContents(e.target.value));
            }}
          />
        </div>
        <div className="submit-button">
          <Button
            type="submit"
            color="dark_cyan"
            className="submit-button-post"
          >
            작성하고 다른 글 보기!
          </Button>
          <Link href={"/"}>
            <Button color="dark_cyan" className="submit-button-prev">
              돌아가기
            </Button>
          </Link>
        </div>
      </form>
      <NotificationContainer />
    </Container>
  );
};

export default RegisterPostingContents;
