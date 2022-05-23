import React from "react";
import styled from "styled-components";
import ReactAutosizeTextarea from "react-autosize-textarea";
import palette from "../../styles/palette";

type InputContainerProps = {
  isValid: boolean;
  useValidation: boolean;
};

const StyledTextArea = styled(ReactAutosizeTextarea)`
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
`;

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  ...props
}) => {
  return <StyledTextArea {...props} />;
};

export default React.memo(Textarea);
