import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useDispatch } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import { useRouter } from "next/router";
import Logo from "../public/img/svg/logo/Logo.svg";
import { useSelector } from "../store";
import palette from "../styles/palette";
import HamburgerIcon from "../public/img/svg/logo/HamburgerIcon.svg";
import { logoutAPI } from "../lib/api/auth";
import { userActions } from "../store/user";
import Pagelist from "./board/PageList";
import usePortal from "../hooks/usePortal";
import { authActions } from "../store/auth";
import AuthModal from "./auths/AuthModal";
import { HidingHeader } from "hiding-header-react";

const Container = styled.div`
  &::-webkit-scrollbar {
    display: block;
  }
  position: sticky;
  top: 0;
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 36px;
  background-color: transparent;
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
    top: 90px;
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
  const { closeModalPortal, openModalPortal, ModalPortal } = usePortal();
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);

  const user = useSelector((state) => state.user); //리덕스에 user를 연결함

  const dispatch = useDispatch();

  //* 로그아웃 하기
  const logout = async () => {
    try {
      console.log("HI");
      await logoutAPI();
      dispatch(userActions.initUser());
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <HidingHeader>
      <header>
        <Container>
          <Link href="/">
            <a className="header-logo-wrapper">
              <Logo className="header-logo" />
            </a>
          </Link>

          {!user.isLogged && (
            <div className="header-auth-buttons">
              <button
                type="button"
                className="header-sign-up-button"
                onClick={() => {
                  dispatch(authActions.setAuthMode("signup"));
                  openModalPortal();
                }}
              >
                회원가입
              </button>
              <button
                type="button"
                className="header-login-button"
                onClick={() => {
                  dispatch(authActions.setAuthMode("login"));
                  openModalPortal();
                }}
              >
                로그인
              </button>
            </div>
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
                  src="/img/svg/logo/profile.svg"
                  className="header-user-profile-image"
                  alt=""
                />
              </button>
              {isUsermenuOpened && (
                <ul className="header-usermenu">
                  <Link href="/searchBoard">
                    <li>게시판 검색하기</li>
                  </Link>
                  <Link href="/post/options">
                    <li>게시판 작성하기</li>
                  </Link>
                  <div className="header-usermenu-divider" />
                  <li role="presentation" onClick={logout}>
                    로그아웃
                  </li>
                </ul>
              )}
            </OutsideClickHandler>
          )}
          <ModalPortal>
            <AuthModal closeModalPortal={closeModalPortal} />
          </ModalPortal>
        </Container>
      </header>
    </HidingHeader>
  );
};

export default Header;
