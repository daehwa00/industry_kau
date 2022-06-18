import styled from "styled-components";
import palette from "../../styles/palette";
import UpArrow from "../../public/static/svg/posting/posting-up-arrow.svg";
import DownArrow from "../../public/static/svg/posting/posting-down-arrow.svg";
import Comment from "../../public/static/svg/posting/comment.svg";
import User from "../../public/static/svg/posting/user/post-user.svg";
import { useSelector } from "../../store";
import { useDispatch } from "react-redux";
import rightPost, { postModalActions } from "../../store/postModal";
import RightPost from "../post/RightPost";
import { getCommentsAPI, getPostAPI } from "../../lib/api/post";
import usePortal from "../../hooks/usePortal";
import * as React from "react";
import PostModal from "../post/PostModal";

const Container = styled.div`
  width: 100%;
  cursor: pointer;
  .post-box {
    border-radius: 30px;
    width: 40%;
    height: 50vh;
    margin: 50px auto;
    background: #fcebeb;
    padding: 20px;
    position: relative;
    box-shadow: 2px 2px 2px 2px gray;
    .post-detail:before {
      content: "";
      width: 0px;
      height: 0px;
      position: absolute;
      border-left: 15px solid transparent;
      border-right: 15px solid #fcebeb;
      border-top: 15px solid #fcebeb;
      border-bottom: 15px solid transparent;
      left: -30px;
      top: 70px;
    }
  }
  .post-wrapper {
    background-color: white;
    display: flex;
    padding: 12px;
    width: 70%;
    height: auto;
    border-radius: 20px;
    box-shadow: 2px 2px 2px 2px gray;
    margin-bottom: 20px;
    padding: 50px 50px 50px 0px;
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
        .post-title {
          font-size: 23px;
          font-weight: 800;
        }
        .post-subCategory {
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
  }
`;

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);

  const clicked = useSelector((state) => state.postModal.clicked);

  const dispatch = useDispatch();

  const { closeModalPortal, openModalPortal, ModalPortal } = usePortal();

  const onClickPost = async (postID: number) => {
    dispatch(postModalActions.setPostClicked());
    const { data } = await getPostAPI(postID);
    console.log(data);
    dispatch(postModalActions.setPostDetail(data));
    openModalPortal();
  };

  return (
    <Container>
      <ul>
        {posts.map((post) => (
          <li
            className="post-wrapper"
            key={post.consolePostId}
            onClick={() => onClickPost(post.consolePostId)}
          >
            <div className="post-left-block">
              <UpArrow style={{ fill: "rgb(42,169,224)" }} />
              <div className="post-likes">{11}</div>
              <DownArrow />
            </div>
            <div className="post-right-block">
              <div className="post-header">
                <div className="post-title">
                  {post.title.length < 25
                    ? post.title
                    : `${post.title.slice(0, 25)}...`}
                </div>
                <div className="post-subCategory">{post.subCategory}</div>
              </div>
              {/* <div className="post-time"></div> */}
              <div className="post-contents">
                {post.contents.length < 500
                  ? post.contents
                  : `${post.contents.slice(0, 500)}...`}
              </div>
              <div className="post-footer">
                <div className="post-footer-user">
                  <User
                    style={{ fill: "rgb(42,169,224)" }}
                    className="post-footer-user-svg"
                  />
                  Posted by {post.email}
                </div>
                <div className="post-footer-comments">
                  <Comment />
                  {100 > 99 ? "99+" : 11}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ModalPortal>
        <PostModal closeModalPortal={closeModalPortal} />
      </ModalPortal>
    </Container>
  );
};

export default Posts;
