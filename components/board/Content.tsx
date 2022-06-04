import styled from "styled-components";
import { PostLine } from "../../pages/board/postlist";
import palette from "../../styles/palette";

const Container = styled.div`
  padding: 62px 30px 100px;
  h1 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 56px;
  }
  h2 {
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
`;

const post = {
  id: 1,
  title: "제목",
  content: "고민내용 입니다.",
};

const Content = () => {
  const title = post.title;
  const content = post.content;

  return (
    <Container>
      <PostLine />
      <h1>{title}</h1>
      <h2>{content}</h2>
    </Container>
  );
};

export default Content;
