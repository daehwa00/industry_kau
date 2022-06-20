import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import userPool from "../../src/userPool";
import Input from "../common/input";
import MailIcon from "../../public/img/svg/auth/MailIcon.svg";
import useValidateMode from "../../hooks/useValidateMode";
import ClosedEyeIcon from "../../public/img/svg/logo/ClosedEyeIcon.svg";
import OpenedEyeIcon from "../../public/img/svg/logo/OpendEyeIcon.svg";
import PasswordWarning from "./PasswordWarning";
import PersonIcon from "../../public/img/svg/auth/PersonIcon.svg";
import { userActions } from "../../store/user";
import { authActions } from "../../store/auth";
import Button from "../common/Button";
import { logoutAPI } from "../../lib/api/auth";

const Container = styled.div`
  width: 568px;
  min-height: 614px;
  .sign-up-input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  h1 {
    margin-top: 48px;
    margin-bottom: 84px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
  }

  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .buttonContainer {
    margin-top: 40px;
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
      border-radius: 15px;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

type IProps = {
  closeModalPortal: () => void;
};
const PASSWORD_MIN_LENGTH = 8;

const SignupModal = ({ closeModalPortal }: IProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");

  const [isPasswordHided, setIsPasswordHided] = useState(true);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const { validateMode, setValidateMode } = useValidateMode();

  const dispatch = useDispatch();

  //*비밀번호 숨김 토글하기
  const togglePasswordHiding = () => {
    setIsPasswordHided(!isPasswordHided);
  };

  //* password가 이름이나 이메일을 포함하는지
  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !lastname ||
      password.includes(lastname) ||
      password.includes(email.split("@")[0]),
    [password, lastname, email]
  );

  //* 비밀번호가 최소 자리수 이상인지
  const isPasswordOverMinLength = useMemo(
    () => password.length >= PASSWORD_MIN_LENGTH,
    [password]
  );

  //* 비밀번호가 숫자나 특수기호를 포함하는지
  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
      /[0-9]/g.test(password),
    [password]
  );

  //* 인풋값 발리데이션 체크 하기
  const validateSignUpForm = () => {
    if (!email) {
      return false;
    }
    if (!lastname) {
      return false;
    }
    if (!firstname) {
      return false;
    }
    if (
      !password ||
      isPasswordHasNameOrEmail ||
      !isPasswordHasNumberOrSymbol ||
      !isPasswordOverMinLength
    ) {
      return false;
    }
    return true;
  };

  //* 언마운트 될 때마다 꺼주어야
  useEffect(() => {
    setValidateMode(false);
  }, []);

  //* 회원 가입을 제출합니다.
  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidateMode(true);

    //제대로 된 값이 들어오면 실행
    if (validateSignUpForm()) {
      const signUpBody = {
        email,
        lastname,
        firstname,
        isLogged: true,
      };

      userPool.signUp(email, password, [], [], (err) => {
        if (err) {
          //이미 계정이 존재할 경우
          if (
            err.message === "An account with the given email already exists."
          ) {
            alert("이미 존재하는 계정입니다.");
            return;
          }
        }
        closeModalPortal();
        alert("이메일 인증을 완료 후 로그인 해주세요.");
      });
    }
  };
  return (
    <Container>
      <form onSubmit={onSubmitSignUp}>
        <h1>회원가입</h1>
        <div className="sign-up-input-wrapper">
          <Input
            name="email"
            placeholder="이메일 주소"
            type="email"
            icon={<MailIcon />}
            value={email}
            isValid={!!email}
            useValidation={validateMode}
            onChange={(e) => setEmail(e.target.value)}
            errorMessage="이메일이 필요합니다."
          />
        </div>
        <div className="sign-up-input-wrapper">
          <Input
            name="lastname"
            placeholder="이름(예:길동)"
            icon={<PersonIcon />}
            value={lastname}
            isValid={!!lastname}
            useValidation={validateMode}
            onChange={(e) => setLastname(e.target.value)}
            errorMessage="이름을 입력하세요."
          />
        </div>
        <div className="sign-up-input-wrapper">
          <Input
            name="firstname"
            placeholder="성(예:홍)"
            icon={<PersonIcon />}
            value={firstname}
            isValid={!!firstname}
            useValidation={validateMode}
            onChange={(e) => setFirstname(e.target.value)}
            errorMessage="이름을 입력하세요."
          />
        </div>
        <div className="sign-up-input-wrapper">
          <Input
            placeholder="비밀번호 설정하기"
            type={isPasswordHided ? "password" : "text"}
            onChange={(e) => setPassword(e.target.value)}
            icon={
              isPasswordHided ? (
                <ClosedEyeIcon onClick={togglePasswordHiding} />
              ) : (
                <OpenedEyeIcon onClick={togglePasswordHiding} />
              )
            }
            onFocus={() => setPasswordFocused(true)}
            value={password}
            isValid={!!password}
            useValidation={validateMode}
            errorMessage="비밀번호를 입력하세요."
          />
        </div>
        {passwordFocused && (
          <>
            <PasswordWarning
              isValid={!isPasswordHasNameOrEmail}
              errorMessage="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다."
            />
            <PasswordWarning
              isValid={isPasswordOverMinLength}
              errorMessage="최소 8자"
            />
            <PasswordWarning
              isValid={isPasswordHasNumberOrSymbol}
              errorMessage="숫자나 기호를 포함하세요."
            />
          </>
        )}
        <div className="buttonContainer">
          <Button type="submit" color="dark_cyan">
            회원가입
          </Button>
          <Button
            type="button"
            onClick={() => dispatch(authActions.setAuthMode("login"))}
          >
            로그인하러 가기
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default SignupModal;
