import App, { AppContext, AppProps } from "next/app";
import dynamic from "next/dynamic";
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import FloatingButtons from "react-floating-buttons";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import { wrapper } from "../store";
import axios from "../lib/api";
import { meAPI } from "../lib/api/auth";

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

export default wrapper.withRedux(app);
