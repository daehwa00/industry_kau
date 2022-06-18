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
import BackgroundSlider from "react-background-slider";

const Container = styled.div`
  .back-slider {
    top: 0;
    left: 0;
    right: 0;
  }
  .bot {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }
`;
const ChatApp = dynamic(import("../components/Chatbot/widget"), { ssr: false });

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <Container>
      <div className="back-slider">
        <BackgroundSlider
          images={[
            "main/png/bg1.jpg",
            "main/png/bg2.jpg",
            "main/png/bg3.jpg",
            "main/png/bg4.jpg",
          ]}
          duration={10}
          transition={2}
        />
      </div>
      <Header />
      <GlobalStyle />
      <div id="root-modal" />
      <Component {...pageProps} />
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

  console.log(Object.keys(context.ctx));

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
