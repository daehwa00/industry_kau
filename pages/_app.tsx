import App, { AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import { cookieStringToObject } from "../lib/utils";
import { wrapper } from "../store";
import axios from "../lib/api";
import { meAPI } from "../lib/api/auth";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <GlobalStyle />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};

export default wrapper.withRedux(app);
