import type { NextPage } from "next";
import Link from "next/link";

import styled from "styled-components";
import Board from "../components/board/Board";
import Button from "../components/button/Button";

const Container = styled.div`
  font-size: 21px;
  color: gray;
`;

const Index: NextPage = () => {
  return (
    <Container>
<<<<<<< HEAD
      <Board/>
=======
      <Board worry="안녕" />
      <Link href={"/board/post/option" || ""}>
        <a>
          {/*onClickNext 추가 요망*/}
          <Button color="dark_cyan">제출</Button>
        </a>
      </Link>
>>>>>>> 9c80e72f97e8a881ccd636e102c45e46fd95039d
    </Container>
  );
};

export default Index;
export {Container};