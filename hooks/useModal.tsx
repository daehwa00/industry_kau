/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useRef, useState, useEffect, useCallback } from "react";
import { NextPage } from "next";
import { createPortal } from "react-dom";
import { CognitoUser } from "amazon-cognito-identity-js";
import styled from "styled-components";
import userPool from "../src/userPool";
import SignupForm from "../components/auth/SignupForm";
import LoginForm from "../components/auth/LoginForm";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;

  .modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
  }
`;

const useModal = () => {
  const [modalOpened, setModalOpend] = useState(false);

  const [signupCheck, setSignupCheck] = useState(true); //회원가입 창인지 알려줌
  const [userId, setUserId] = useState<String | null>(null); //유저아이디

  //Modal열기
  const openLoginModal = () => {
    setModalOpend(true);
    setSignupCheck(true);
  };

  const openSignUpModal = () => {
    setModalOpend(true);
    setSignupCheck(false);
  };

  //Modal닫기
  const closeModal = () => {
    setModalOpend(false);
  };

  const turnOver = useCallback(
    //로그인에서 회원가입으로, 회원가입에서 로그인 창으로 이동
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setSignupCheck((prev) => !prev);
    },
    []
  );

  //만약 로그인에 성공했다면 UserId를 세팅해줍니다.
  useEffect(() => {
    class newCognitoUser extends CognitoUser {
      public storage?: any; //storage에 있을수도 없을수도 있습니다.
    }

    const currentUser: newCognitoUser | null = userPool.getCurrentUser();
    if (currentUser) {
      console.log(currentUser);
      const { userId } = currentUser.storage;
      setUserId(userId); //userId에 email이 저장되어 있음
    }
  }, []);

  const ModalPortal: NextPage = () => {
    const ref = useRef<Element | null>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      if (document) {
        const dom = document.querySelector("#root-modal");
        ref.current = dom;
      }
    }, []);

    if (ref.current && mounted && modalOpened) {
      return createPortal(
        <Container>
          <div
            className="modal-background"
            role="presentation"
            onClick={closeModal}
          />
          <>
            {signupCheck ? (
              <LoginForm goSignup={turnOver} setUserId={setUserId} />
            ) : (
              <SignupForm goLogin={turnOver} />
            )}
          </>
        </Container>,
        ref.current
      );
    }
    return null;
  };
  return { openLoginModal, openSignUpModal, ModalPortal };
};

export default useModal;
