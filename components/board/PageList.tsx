import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  .all {
    margin: 30px;
    font-size: 20px;
    color: white;
    font-weight: 800;
    transition: all 0.3s linear;
    &:hover {
      font-size: 23px;
    }
  }
`;

const Pagelist = () => {
  return (
    <Container>
      <Link href="/board/study">
        <a className="all">취업/진로</a>
      </Link>

      <Link href="/board/postdesign">
        <a className="all">연애</a>
      </Link>

      <Link href="/board/human">
        <a className="all">대인관계</a>
      </Link>

      <Link href="/board/disease">
        <a className="all">가계</a>
      </Link>

      <Link href="/board/etc">
        <a className="all">기타</a>
      </Link>
    </Container>
  );
};
export default Pagelist;
