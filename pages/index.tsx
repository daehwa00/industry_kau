import type { NextPage } from "next";
import styled from "styled-components";
import Board from "../components/board/Board";

const Container = styled.div`
  font-size: 21px;
  color: gray;
`;

const Index: NextPage = () => {
  return (
    <Container>
      <Board/>
    </Container>
  );
};

export default Index;
export {Container};