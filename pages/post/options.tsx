import React from "react";
import { NextPage } from "next";
import styled from "styled-components";
import RegisterPostingOptions from "../../components/register/RegisterPostingOptions";

const Container = styled.div`
  clear: both;
  content: "";
`;
const posting: NextPage = () => {
  return (
    <Container>
      <RegisterPostingOptions />
    </Container>
  );
};

export default posting;
