import App, { AppContext, AppProps } from "next/app";
import { Store } from "redux";
import Router from "next/router";
import { NextPageContext } from "next";
import cookies from "next-cookies";
import dynamic from "next/dynamic";
import React from "react";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import { wrapper } from "../store";

import { userActions } from "../store/user";

const ChatApp = dynamic(import("../components/Chatbot/chat"), { ssr: false });

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <GlobalStyle />
      <Component {...pageProps} />
      <div id="root-modal" />
      <ChatApp />
    </>
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
    fistname: "고",
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
