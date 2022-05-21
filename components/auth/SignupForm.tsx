/* eslint-disable no-alert */
import React, {
  useCallback,
  useState,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import userPool from "../../src/userPool";
import Input from "../common/input";
import MailIcon from "../../public/static/svg/logo/MailIcon.svg";
import useValidateMode from "../../hooks/useValidateMode";
import ClosedEyeIcon from "../../public/static/svg/logo/ClosedEyeIcon.svg";
import OpenedEyeIcon from "../../public/static/svg/logo/OpendEyeIcon.svg";
import PasswordWarning from "./PasswordWarning";

const SignupFormContainer = styled.div`
  z-index: 11;
  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
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
  closeModalPortal: () => void;
};
const PASSWORD_MIN_LENGTH = 8;
const SignupModal = ({ goLogin, closeModalPortal }: IProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isPasswordHided, setIsPasswordHided] = useState(true);
  const gologinBtn = useRef<HTMLButtonElement>(null);
  const { validateMode, setValidateMode } = useValidateMode();

  //*비밀번호 숨김 토글하기
  const togglePasswordHiding = () => {
    setIsPasswordHided(!isPasswordHided);
  };

  //* password가 이름이나 이메일을 포함하는지
  const isPasswordHasNameOrEmail = useMemo(
    () => !password || password.includes(email.split("@")[0]),
    [password, email]
  );

  //* 비밀번호가 최수 자리수 이상인지
  const isPasswordOverMinLength = useMemo(
    () => password.length >= PASSWORD_MIN_LENGTH,
    [password]
  );

  //이메일이 입력될 때
  const onChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setEmail(event.target.value);
    },
    []
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

  //회원 가입을 제출합니다.
  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidateMode(true);

    //제대로 된 값이 들어오면 실행
    if (validateSignUpForm()) {
      userPool.signUp(email, password, [], [], (err) => {
        if (err) {
          //이미 계정이 존재할 경우
          if (
            err.message === "An account with the given email already exists."
          ) {
            alert("이미 존재하는 계정입니다.");
          }
        }
        closeModalPortal();
        alert("가입 완료");
      });
    }

    //인풋값이 아예 없다면 api를 보내지 않음
    if (!email || !password) {
      return undefined;
    }
    return null;
  };

  useEffect(() => {
    setValidateMode(false);
  }, []);

  return (
    <SignupFormContainer>
      <form className="singupFormBox" onSubmit={onSubmitSignUp}>
        <h1>SIGNUP</h1>
        <div className="inputContainer">
          <Input
            placeholder="이메일 주소"
            type="email"
            onChange={onChangeEmail}
            icon={<MailIcon />}
            name="email"
            value={email}
            useValidation
            isValid={!email}
            errorMessage="이메일을 넣어주세요"
          />
        </div>
        <div className="inputContainer">
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

export default SignupModal;
