import { NextPage } from "next";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  height: 400px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  margin-left: 20px;
  margin-top: 20px;
  .board {
    margin-left: 20px;
    margin-top: 10px;
  }
`;
interface IProps {
  worry: string;
}
const Board: NextPage<IProps> = ({ worry }) => {
  return (
    <Container>
      <h1>{worry}게시판</h1>
      <div className="board">안녕</div>
    </Container>
  );
};

export default Board;
