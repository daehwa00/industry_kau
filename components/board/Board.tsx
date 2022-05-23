import { NextPage } from "next";
import styled from "styled-components";
import Layout from "./Layout";
import Main from "./Main";

const Container = styled.div``;
interface IProps {
  worry: string;
}

const Board: NextPage = props => {
  return (
    <Container>
      <Layout/>
      <Main/>
    </Container>
  );
};

export default Board;
