import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import palette from "../../styles/palette";
import { useSelector } from "../../store";
import { postingActions } from "../../store/posting";
import Textarea from "../common/Textarea";

const Container = styled.div`
  padding: 62px 30px 100px;
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
    width: 430px;
    font-size: 14px;
    margin-bottom: 16px;
  }
`;
const RegisterPostingDescription: React.FC = () => {
  const dispatch = useDispatch();

  const text = useSelector((state) => state.posting.text);

  // 고민 설명 변경시
  const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    dispatch(postingActions.setText(event.target.value));

  return (
    <Container>
      <h2>어떤 상황인지 자세히 말해볼래요?</h2>
      <h3>다 들어줄게요</h3>
      <p className="register-posting-text-wrapper">
        당신의 이야기, 하고 싶은만큼 해요
      </p>
      <div className="register-posting-text-wrapper">
        <Textarea value={text} onChange={onChangeText} />
      </div>
    </Container>
  );
};

export default RegisterPostingDescription;
