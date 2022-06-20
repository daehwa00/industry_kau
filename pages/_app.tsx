import App, { AppContext, AppProps } from "next/app";
import { Store } from "redux";
import Router from "next/router";
import { NextPageContext } from "next";
import cookies from "next-cookies";
import dynamic from "next/dynamic";
import React from "react";
import styled from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import { wrapper } from "../store";
import { userActions } from "../store/user";
import BackgroundSlider from "../components/background-slider";
import "react-notifications/lib/notifications.css";

const Container = styled.div`
  .bot {
    position: fixed;
    right: 35px;
    bottom: 35px;
  }
`;
const ChatApp = dynamic(import("../components/Chatbot/widget"), { ssr: false });

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <Container>
      <BackgroundSlider
        images={[
          "../main/png/bg1mod.png",
          "../main/png/bg2mod.png",
          "../main/png/bg3mod.png",
          "../main/png/bg4mod.png",
        ]}
        duration={5}
        transition={3}
      />
      <Header />
      <GlobalStyle />
      <Component {...pageProps} />
      <div id="root-modal" />
      <div className="bot">
        <ChatApp />
      </div>
    </Container>
  );
};

app.getInitialProps = async (context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  const { ctx } = context;
  const allCookies = cookies(ctx);
  const emailCookie = allCookies.email;

  const userBody = {
    email: emailCookie,
    lastname: "대화",
    firstname: "고",
    isLogged: true,
  };

  const { store } = context.ctx;
  const { isLogged } = store.getState().user;

  try {
    if (!isLogged && emailCookie) {
      store.dispatch(userActions.setUser(userBody));
    }
  } catch (e) {
    console.log(e);
  }
  return { ...appInitialProps };
};

export interface MyPageContext extends NextPageContext {
  store: Store;
  isServer: boolean;
}

export default wrapper.withRedux(app);
