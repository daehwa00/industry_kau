/* eslint-disable react/require-default-props */
import React, { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import BackArrowIcon from "../../../public/img/svg/register/register_posting_footer_back_arrow.svg";
import Button from "../../common/Button";
import palette from "../../../styles/palette";
import useValidateMode from "../../../hooks/useValidateMode";

const Container = styled.footer`
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.58);
  background-color: white;
  position: fixed;
  bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 55%;
  height: 62px;
  z-index: 10;
  border-top: 1px solid ${palette.gray_dd};
  .prev-next {
    display: flex;
  }
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
      <div className="prev-next">
        <Link href={prevHref || ""}>
          <a className="register-posting-footer-back">
            <BackArrowIcon />
            뒤로
          </a>
        </Link>
      </div>
      <div className="prev-next">
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
      </div>
    </Container>
  );
};

export default React.memo(RegisterPostingFooter);
