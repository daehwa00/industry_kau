import Index from "../../pages";
import styled from "styled-components";
import palette from "../../styles/palette";

const Container = styled.div`
  width: 100%;
  padding: 0px 25%;
  .post-wrapper {
    padding: 12px;
    width: 100%;
    height: auto;
    border-radius: 20px;
    box-shadow: 2px 2px 2px 2px gray;
    margin-bottom: 20px;
    padding: 20px 30px;
    .post-header {
      .post-title {
        justify-content: space-between;
        font-size: 20px;
        margin-bottom: 20px;
      }
      .post-subCategory {
      }
    }
    .post-contents {
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
`;

const Posts = ({ posts }) => {
  return (
    <Container>
      <ul>
        {posts.map((post) => (
          <li className="post-wrapper" key={post.id}>
            <div className="post-header">
              <div className="post-title">
                {post.title}
                <span className="post-subCategory">{post.subCategoryType}</span>
              </div>
            </div>
            <div className="post-contents">{post.contents}</div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Posts;
