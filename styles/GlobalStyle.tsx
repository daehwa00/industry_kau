import reset from "styled-reset";
import { createGlobalStyle, css } from "styled-components";
import palette from "./palette";

const globalStyle = css`
  ${reset};
  @font-face {
    font-family: "GangwonEdu_OTFBoldA";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEdu_OTFBoldA.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: GangwonEdu_OTFBoldA, SUIT-Medium, Noto Sans, Noto Sans KR;
    color: ${palette.black};
  }
  body::-webkit-scrollbar {
    display: none;
  }
  a {
    text-decoration: none;
    color: ${palette.black};
  }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyle}
`;

export default GlobalStyle;
