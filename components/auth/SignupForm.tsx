/* eslint-disable no-alert */
import React, { useCallback, useState, useRef } from "react";
import styled from "styled-components";
import userPool from "../../src/userPool";

const SignupFormContainer = styled.div`
  z-index: 11;
  .singupFormBox {
    padding: 24px;
    width: 568px;
    height: 614px;
    background-color: white;
    justify-content: center;

    h1 {
      margin-top: 48px;
      margin-bottom: 84px;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
    }

    .inputContainer {
      margin-bottom: 12px;

      input {
        padding: 13px 12px;
        width: 100%;
        height: 48px;
        line-height: 1.47;
        font-size: 15px;
        border: 1px solid #dee2e6;
        letter-spacing: -0.3px;
        border-radius: 4px;
        background-color: #fff;
      }
    }
    .buttonContainer {
      margin-top: 69px;
      button {
        width: 100%;
        height: 48px;
        border: 1px solid;
        border-color: #3b613b;
        border-radius: 4px;
        font-weight: 600;
        background-color: #3b613b;
        cursor: pointer;
        color: #fff;
        margin-top: 12px;
        border-radius: 15px;
      }
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  float: right;
  line-height: 30px;
  font-weight: 600;
`;

type IProps = {
  goLogin: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const SignupForm = ({ goLogin }: IProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const gologinBtn = useRef<HTMLButtonElement>(null);

  //이메일이 입력될 때
  const onChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setEmail(event.target.value);
    },
    []
  );

  //적절한 비밀번호인지 체크합니다.
  const CheckPass = (str: string) => {
    const reg1 = /^[a-z0-9]{8,20}$/; // a-z 0-9 중에 8자리 부터 20자리만 허용
    const reg2 = /[a-z]/g; //매칭되는걸 모두 찾는다.
    const reg3 = /[0-9]/g;
    return reg1.test(str) && reg2.test(str) && reg3.test(str);
  };

  //비밀번호를 입력할 때마다 적절한 비밀번호인지 체크하며, 비밀번호를 바꾸어줍니다.
  const onChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      setPasswordError(!CheckPass(event.target.value));
    },
    []
  );

  //제출합니다.
  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      userPool.signUp(email, password, [], [], (err) => {
        if (err) {
          //이미 계정이 존재할 경우
          if (
            err.message === "An account with the given email already exists."
          ) {
            alert("이미 존재하는 계정입니다.");
          }
        }
        alert("가입 완료");
        return null;
      });
    },
    [email, password]
  );

  return (
    <SignupFormContainer>
      <form className="singupFormBox" onSubmit={onSubmit}>
        <h1>SIGNUP</h1>
        <div className="inputContainer">
          <input
            placeholder="이메일"
            type="email"
            onChange={onChangeEmail}
            required
          />
        </div>
        <div className="inputContainer">
          <input
            placeholder="비밀번호"
            type="password"
            onChange={onChangePassword}
            minLength={8}
            required
          />
        </div>
        {passwordError && (
          <ErrorMessage>
            8 or more characters, must include numbers and letters
          </ErrorMessage>
        )}
        <div className="buttonContainer">
          <button type="submit">회원가입</button>
          <button type="button" ref={gologinBtn} onClick={goLogin}>
            로그인하러 가기
          </button>
        </div>
      </form>
    </SignupFormContainer>
  );
};

export default SignupForm;
