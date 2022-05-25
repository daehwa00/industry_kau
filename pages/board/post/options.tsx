import React from "react";
import { NextPage } from "next";
import RegisterPostingOptions from "../../../components/register/RegisterPostingOptions";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const posting: NextPage = () => {
  return <RegisterPostingOptions />;
};

export default posting;
