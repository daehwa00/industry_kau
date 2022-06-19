/* eslint-disable react/require-default-props */
import React, { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import BackArrowIcon from "../../../public/img/svg/register/register_posting_footer_back_arrow.svg";
import Button from "../../common/Button";
import palette from "../../../styles/palette";
import useValidateMode from "../../../hooks/useValidateMode";

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 548px;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${palette.gray_dd};
  .register-posting-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.dark_cyan};
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
  }
`;
interface IProps {
  prevHref?: string;
  nextHref?: string;
  isValid: boolean;
}
const RegisterPostingFooter: React.FC<IProps> = ({
  prevHref,
  nextHref,
  isValid = true,
}) => {
  const { setValidateMode } = useValidateMode();

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  return (
    <Container>
      <Link href={prevHref || ""}>
        <a className="register-posting-footer-back">
          <BackArrowIcon />
          뒤로
        </a>
      </Link>
      <Link href={nextHref || ""}>
        <a>
          <Button
            // onClick={(e) => {
            //   if (!isValid) {
            //     //유효하지 않다면 가지 않습니다.
            //     e.preventDefault();
            //     setValidateMode(true);
            //   }
            // }}
            color="dark_cyan"
          >
            다음
          </Button>
        </a>
      </Link>
    </Container>
  );
};

export default React.memo(RegisterPostingFooter);
