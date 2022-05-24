import React from "react";
import ReactAutosizeTextarea from "react-autosize-textarea";
import styled, { css } from "styled-components";
import { useSelector } from "../../store";
import palette from "../../styles/palette";

type InputContainerProps = {
  isValid: boolean;
  useValidation: boolean;
};

const Container = styled.div<InputContainerProps>`
  label {
    display: block;
    margin-bottom: 8px;
  }
  textarea {
    position: relative;
    width: 100%;
    min-height: 216px;
    padding: 11px;
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    resize: none;
    font: inherit;
    & ::placeholder {
      color: ${palette.gray_76};
    }
    & :focus {
      border-color: ${palette.dark_cyan};
    }
  }
  svg {
    position: absolute;
    right: 11px;
    height: 46px;
  }
  .input-error-message {
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
    color: ${palette.tawny};
  }
  ${({ useValidation, isValid }) =>
    useValidation &&
    !isValid &&
    css`
      textarea {
        background-color: ${palette.snow};
        border-color: ${palette.orange};
        & :focus {
          border-color: ${palette.orange};
        }
      }
    `}
  ${({ useValidation, isValid }) =>
    useValidation &&
    isValid &&
    css`
      textarea {
        border-color: ${palette.dark_cyan};
      }
    `}
`;

interface IProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
}

const Textarea: React.FC<IProps> = ({
  label,
  isValid = false,
  useValidation = true,
  errorMessage,
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container isValid={isValid} useValidation={useValidation && validateMode}>
      {label && <label>{label}</label>}
      <ReactAutosizeTextarea {...props} />
      {useValidation && validateMode && !isValid && errorMessage && (
        <p className="input-error-message">{errorMessage}</p>
      )}
    </Container>
  );
};

export default React.memo(Textarea);
