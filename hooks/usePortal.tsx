import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import CloseXIcon from "../public/static/svg/auth/CloseXIcon.svg";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  .modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }

  .modal-contents {
    padding: 32px;
    background-color: white;
    z-index: 11;
    .modal-close-x-icon {
      cursor: pointer;
      display: block;
      margin: 0 0 40px auto;
    }
  }
`;

export default () => {
  const [modalOpened, setModalOpened] = useState(false);

  //* 포탈 열기
  const openModalPortal = () => {
    setModalOpened(true);
  };

  //* 포탈 닫기
  const closeModalPortal = () => {
    setModalOpened(false);
  };

  interface IProps {
    children: React.ReactNode;
  }

  //* 모달 포탈
  const ModalPortal: React.FC<IProps> = ({ children }) => {
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
            onClick={closeModalPortal}
          />
          <div className="modal-contents">
            <CloseXIcon
              className="modal-close-x-icon"
              onClick={closeModalPortal}
            />
            {children}
          </div>
        </Container>,
        ref.current
      );
    }
    return null;
  };
  return {
    openModalPortal,
    closeModalPortal,
    ModalPortal: React.memo(ModalPortal),
  };
};
