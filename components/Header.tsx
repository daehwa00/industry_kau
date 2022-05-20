import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Logo from "../public/static/svg/logo/Logo.svg";
import LogoText from "../public/static/svg/logo/LogoText.svg";
import palette from "../styles/palette";
import useModal from "../hooks/useModal";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
  }
  .header-auth-buttons {
    .header-sign-up-button {
      height: 42px;
      border-radius: 21px;
      margin-right: 8px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      padding: 0 16px;
      border: 0;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-login-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
  }
`;

const Header: React.FC = () => {
  const { openLoginModal, openSignUpModal, ModalPortal } = useModal();
  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <Logo className="header-logo" />
          <LogoText />
        </a>
      </Link>
      <div className="header-auth-buttons">
        <button
          type="button"
          className="header-sign-up-button"
          onClick={openSignUpModal}
        >
          회원가입
        </button>
        <button
          type="button"
          className="header-login-button"
          onClick={openLoginModal}
        >
          로그인
        </button>
      </div>
      <ModalPortal />
    </Container>
  );
};

export default Header;
