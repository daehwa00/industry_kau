import React from "react";
import { NextPage } from "next";
import styled from "styled-components";
import RegisterPostingOptions from "../../../components/register/RegisterPostingOptions";
import RegisterPostingContents from "../../../components/register/RegisterPostingContents";

const Container = styled.div`
  clear: both;
  content: "";
  display: block;
`;
const posting: NextPage = () => {
  return (
    <Container>
      <RegisterPostingOptions />
      <RegisterPostingContents />
    </Container>
  );
};

export default posting;
