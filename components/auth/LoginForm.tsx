/* eslint-disable object-shorthand */
/* eslint-disable no-console */
/* eslint-disable func-names */
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import React, { useCallback, useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import styled from "styled-components";
import userPool from "../../src/userPool";
import Input from "../common/input";
import MailIcon from "../../public/static/svg/logo/MailIcon.svg";
import useValidateMode from "../../hooks/useValidateMode";
import ClosedEyeIcon from "../../public/static/svg/logo/ClosedEyeIcon.svg";
import OpenedEyeIcon from "../../public/static/svg/logo/OpendEyeIcon.svg";
import { userActions } from "../../store/user";

const Container = styled.div`
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
  setUserId: any;
  closeModalPortal: () => void;
}

const LoginForm: React.FC<IProps> = ({
  goSignup,
  setUserId,
  closeModalPortal,
}: IProps) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isPasswordHided, setIsPasswordHided] = useState(true);

  const { validateMode, setValidateMode } = useValidateMode();

  //*비밀번호 숨김 토글하기
  const togglePasswordHiding = () => {
    setIsPasswordHided(!isPasswordHided);
  };

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
      //성공시
      onSuccess: function (result: any) {
        dispatch(userActions.setUser({ email }));
        closeModalPortal();
        //result.idToken.payload에 가입한 회원의 정보가 들어있음
        setUserId(result.idToken.payload.email);
        alert("로그인 성공");
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

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  const onSubmitLogin = useCallback(
    (e) => {
      e.preventDefault();
      setValidateMode(true);
      if (!email || !password) {
        alert("이메일과 비밀번호를 입력해 주세요.");
      } else {
        authenticate(email, password);
      }
    },
    [email, password]
  );

  return (
    <Container>
      <form className="loginFormBox" onSubmit={onSubmitLogin}>
        <h1>LOGIN</h1>
        <div className="inputContainer">
          <Input
            placeholder="이메일 주소"
            name="email"
            type="email"
            icon={<MailIcon />}
            value={email}
            isValid={email !== ""}
            useValidation={validateMode}
            onChange={(e) => setEmail(e.target.value)}
            errorMessage="이메일이 필요합니다."
          />
        </div>
        <div className="inputContainer sign-up-password-input-wrapper">
          <Input
            placeholder="비밀번호 설정하기"
            name="password"
            type={isPasswordHided ? "password" : "text"}
            icon={
              isPasswordHided ? (
                <ClosedEyeIcon onClick={togglePasswordHiding} />
              ) : (
                <OpenedEyeIcon onClick={togglePasswordHiding} />
              )
            }
            value={password}
            isValid={password !== ""}
            useValidation={validateMode}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage="비밀번호를 입력하세요."
          />
        </div>
        <button type="submit">로그인</button>
        <button type="button" onClick={goSignup}>
          회원가입
        </button>
      </form>
    </Container>
  );
};
export default LoginForm;
