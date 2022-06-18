import { NextPage } from "next";
import styled from "styled-components";
import User from "../../public/static/svg/posting/user/post-user.svg";
import Comment from "../../public/static/svg/posting/comment.svg";
import { useSelector } from "../../store";
import palette from "../../styles/palette";
import UpArrow from "../../public/static/svg/posting/posting-up-arrow.svg";
import DownArrow from "../../public/static/svg/posting/posting-down-arrow.svg";
import formatDistance from "date-fns/formatDistance";
import ProgressBar from "@ramonak/react-progress-bar";

const Container = styled.div`
  width: 50vw;
  cursor: pointer;
  background-color: white;
  display: flex;
  padding: 12px;
  height: auto;
  margin-bottom: 20px;
  padding: 20px 50px 50px 0px;
  .post-left-block {
    margin: 30px 30px 0px 30px;
    font-weight: 800;
    .post-likes {
      margin: 20px 0 20px 0;
    }
  }
  .post-right-block {
    width: 100%;
    .post-header {
      display: flex;
      justify-content: space-between;
      height: 40px;
      margin-bottom: 20px;
      .post-title-time {
        .post-title {
          font-size: 23px;
          font-weight: 800;
          padding-bottom: 5px;
        }
        .post-time {
          font-size: 12px;
        }
      }
      .post-subCategory-bar {
        position: relative;
        .post-subCategory {
          font-size: 12px;
          font-weight: bold;
          color: ${palette.gray_71};
        }
      }
    }
    .post-contents {
      font-size: 14px;
      margin-bottom: 20px;
      line-height: 200%;
      color: ${palette.gray};
    }
    .post-footer {
      display: flex;
      justify-content: space-between;
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 10px;
      color: ${palette.gray_76};
      .post-footer-user {
        display: flex;
        align-items: center;
        font-size: 12px;
        .post-footer-user-svg {
          margin-right: 10px;
        }
      }
      .post-footer-comment {
        margin-right: 5px;
      }
    }
  }
  .post-left-block {
    justify-content: space-between;
    align-items: center;
    display: flex;
    width: 70%;
    height: 6vh;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 2px gray;
    padding: 0 140px 0 140px;
    margin-left: 70px;
  }
  .post-passing {
    justify-content: center;
    align-items: center;
  }
`;

interface IProps {
  closeModalPortal: () => void;
}

const PostModal: NextPage<IProps> = ({ closeModalPortal }) => {
  const post = useSelector((state) => state.postModal.postDetail);
  return (
    <Container>
      <div className="post-left-block">
        <UpArrow style={{ fill: "rgb(42,169,224)" }} />
        <div className="post-likes">{11}</div>
        <DownArrow />
      </div>
      <div className="post-right-block">
        <div className="post-header">
          <div className="post-title-time">
            <div className="post-title">{post.title}</div>
            <div className="post-time">
              {formatDistance(new Date(post.createdAt), new Date(), {
                addSuffix: true,
              })}
            </div>
          </div>
          <div className="post-subCategory-bar">
            <div className="post-subCategory">{post.subCategory}</div>
          </div>
        </div>
        <div className="post-contents">{post.contents}</div>
        <div className="post-footer">
          <div className="post-footer-user">
            <User
              style={{ fill: "rgb(42,169,224)" }}
              className="post-footer-user-svg"
            />
            Posted by {post.email}
          </div>
          <div className="post-footer-comments">
            {post.negative > 0.5 ? (
              <ProgressBar
                completed={post.negative * 100}
                bgColor="#ff3b1f"
                height="5px"
                width="200px"
                customLabel=" "
              />
            ) : (
              <ProgressBar
                completed={post.negative * 100}
                bgColor="#50bcdf"
                height="5px"
                width="200px"
                customLabel=" "
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PostModal;
