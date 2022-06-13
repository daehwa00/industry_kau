import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import palette from "../../styles/palette";
import Textarea from "../common/Textarea";
import RegisterPostingFooter from "./footer/RegisterPostingFooter";
import useValidateMode from "../../hooks/useValidateMode";
import { useSelector } from "../../store";
import { postAPI } from "../../lib/api/posting";
import { postingActions } from "../../store/posting";

const Container = styled.div`
  padding: 62px 30px 100px;
  display: inline-block;
  height: 1200px;
  width: 55%;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
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
`;

const RegisterPostingContents: React.FC = () => {
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

  //* 포스팅 폼 제출하기
  const onSubmitPosting = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidateMode(true);

    if (validatePostingForm()) {
      try {
        const postingBody = {
          title,
          contents,
          email: "daehwa001210@gmail.com",
          anonymous,
          mainCategory,
          subCategory,
        };
        await postAPI(postingBody);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container>
      <p>{mainCategory}</p>
      <p>{subCategory}</p>
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
        <h3>다 들어줄게요</h3>
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
        <button type="submit">제출</button>
        <RegisterPostingFooter isValid={false} prevHref="/" nextHref="/" />
      </form>
    </Container>
  );
};

export default RegisterPostingContents;