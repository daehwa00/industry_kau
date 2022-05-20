/* eslint-disable object-shorthand */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-alert */
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { NextPage } from "next";
import styled from "styled-components";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userPool from "../../src/userPool";

const LoginFormContainer = styled.div`
  z-index: 11;
  .loginFormBox {
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
    }
  }
`;

interface IProps {
  goSignup: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  setUserId: Dispatch<SetStateAction<string | null>>;
}

const LoginForm: NextPage<IProps> = ({ goSignup, setUserId }: IProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const authenticate = useCallback((email, Password) => {
    const congnitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password,
    });
    congnitoUser.authenticateUser(authDetails, {
      onSuccess: function (result: any) {
        console.log(result);
        //result.idToken.payload에 가입한 회원의 정보가 들어있음
        setUserId(result.idToken.payload.email);
        console.log(result.idToken.payload);
      },
      //실패시
      onFailure: function (err) {
        console.log(err);
        if (err.message === "User is not confirmed.") {
          alert("가입한 이메일을 인증해주세요.");
        } else if (err.message === "Incorrect username or password.") {
          alert("잘못 된 이메일 또는 비밀번호가 아닙니다.");
        }
      },
    });
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      authenticate(email, password);
    },
    [email, password]
  );

  return (
    <LoginFormContainer>
      <form className="loginFormBox" onSubmit={onSubmit}>
        <h1>LOGIN</h1>
        <div className="inputContainer">
          <input
            value={email}
            onChange={onChangeEmail}
            placeholder="이메일"
            type="email"
            required
          />
        </div>
        <div className="inputContainer">
          <input
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호"
            type="password"
            required
          />
        </div>
        <button type="submit">로그인</button>
        <button type="button" onClick={goSignup}>
          회원가입
        </button>
      </form>
    </LoginFormContainer>
  );
};
export default LoginForm;
