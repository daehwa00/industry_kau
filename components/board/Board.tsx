import { NextPage } from "next";
import styled from "styled-components";

const Container = styled.div``;
interface IProps {
  worry: string;
}
const Board: NextPage<IProps> = ({ worry }) => {
  return (
    <Container>
      <h1>{worry}게시판</h1>
    </Container>
  );
};

export default Board;
