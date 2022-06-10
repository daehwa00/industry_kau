import App, { AppContext, AppProps } from "next/app";
import dynamic from "next/dynamic";
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import { wrapper } from "../store";
import axios from "../lib/api";
import { meAPI } from "../lib/api/auth";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  padding-bottom: 10px;
  align-items: flex-end;
`;
const ChatApp = dynamic(import("../components/Chatbot/widget"), { ssr: false });

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <GlobalStyle />
      <Component {...pageProps} />
      <div id="root-modal" />
      <Container>
        <ChatApp />
      </Container>
    </>
  );
};

export default wrapper.withRedux(app);
