import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useDispatch } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import { useSelector } from "../store";
import Logo from "../public/static/svg/logo/Logo.svg";
import LogoText from "../public/static/svg/logo/LogoText.svg";
import palette from "../styles/palette";
import useModal from "../hooks/useModal";
import HamburgerIcon from "../public/static/svg/logo/HamburgerIcon.svg";
import { logoutAPI } from "../lib/api/auth";
import { userActions, authActions } from "../store/user";

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
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px !important;
  z-index: 10;
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
  }
  /* 헤더 로그인 회원가입 버튼*/
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
  }
  .header-user-profile {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 6px 0 16px;
    border: 0;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    outline: none;
    &:hover {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    }
    img {
      margin-left: 8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  /** react-ouside-click-handler div */
  .header-logo-wrapper + div {
    position: relative;
  }
  .header-usermenu {
    position: absolute;
    right: 0;
    top: 52px;
    width: 240px;
    padding: 8px 0;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: white;
    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 42px;
      padding: 0 16px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-usermenu-divider {
      width: 100%;
      height: 1px;
      margin: 8px 0;
      background-color: ${palette.gray_dd};
    }
  }
`;

const Header: React.FC = () => {
  const { openLoginModal, openSignUpModal, ModalPortal } = useModal();
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //* 로그아웃 하기
  const logout = async () => {
    try {
      await logoutAPI();
      dispatch(userActions.initUser());
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <Logo className="header-logo" />
          <LogoText />
        </a>
      </Link>
      {!user.isLogged && (
        <>
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
        </>
      )}
      {user.isLogged && (
        <OutsideClickHandler
          onOutsideClick={() => {
            if (isUsermenuOpened) {
              setIsUsermenuOpened(false);
            }
          }}
        >
          <button
            className="header-user-profile"
            type="button"
            onClick={() => setIsUsermenuOpened(!isUsermenuOpened)}
          >
            <HamburgerIcon />
            <img
              src="/static/svg/logo/profile.svg"
              className="header-user-profile-image"
              alt=""
            />
          </button>
          {isUsermenuOpened && (
            <ul className="header-usermenu">
              <li>내 정보</li>
              <li>게시판 작성하기</li>
              <div className="header-usermenu-divider" />
              <li role="presentation" onClick={logout}>
                로그아웃
              </li>
            </ul>
          )}
        </OutsideClickHandler>
      )}
      <ModalPortal />
    </Container>
  );
};

export default Header;
