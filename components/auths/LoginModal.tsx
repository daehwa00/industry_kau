import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Input from "../common/input";
import Button from "../common/Button";
import MailIcon from "../../public/img/svg/auth/MailIcon.svg";
import useValidateMode from "../../hooks/useValidateMode";
import ClosedEyeIcon from "../../public/img/svg/logo/ClosedEyeIcon.svg";
import OpenedEyeIcon from "../../public/img/svg/logo/OpendEyeIcon.svg";
import { loginAPI } from "../../lib/api/auth";
import { authActions } from "../../store/auth";
import { userActions } from "../../store/user";
import { LoginSuccess, NotificationContainer } from "../post/PostModal";

const Container = styled.div`
  z-index: 11;
  width: 568px;
  min-height: 614px;
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
    border-color: #f2b001;
    border-radius: 4px;
    font-weight: 600;
    background-color: #f2b001;
    cursor: pointer;
    color: #fff;
    margin-top: 12px;
    &:hover {
      opacity: 0.8;
    }
  }
`;

interface IProps {
  closeModalPortal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModalPortal }: IProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isPasswordHided, setIsPasswordHided] = useState(true);

  const { validateMode, setValidateMode } = useValidateMode();

  const dispatch = useDispatch();

  //*비밀번호 숨김 토글하기
  const togglePasswordHiding = () => {
    setIsPasswordHided(!isPasswordHided);
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  //로그인 버튼 클릭
  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidateMode(true);
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해 주세요.");
    } else {
      const loginBody = { email, password };
      try {
        const data = await loginAPI(loginBody);
        closeModalPortal();
        alert("로그인 성공");
        LoginSuccess();

        const userBody = {
          email,
          lastname: "대화",
          firstname: "고",
          isLogged: true,
        };

        dispatch(userActions.setUser(userBody));
      } catch (e) {
        console.log(e);
        if (e.message === "User is not confirmed.") {
          alert("가입한 이메일을 인증해주세요.");
        } else if (e.message === "Incorrect username or password.") {
          alert("잘못 된 이메일 또는 비밀번호가 아닙니다.");
        }
      }
    }
  };

  return (
    <Container>
      <form onSubmit={onSubmitLogin}>
        <h1>로그인</h1>
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
        <Button type="submit">로그인</Button>
        <Button
          type="button"
          onClick={() => {
            dispatch(authActions.setAuthMode("signup"));
          }}
        >
          회원가입
        </Button>
      </form>
      <NotificationContainer />
    </Container>
  );
};
export default LoginModal;
