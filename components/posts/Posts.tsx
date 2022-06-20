import styled from "styled-components";
import palette from "../../styles/palette";
import UpArrow from "../../public/img/svg/posting/posting-up-arrow.svg";
import DownArrow from "../../public/img/svg/posting/posting-down-arrow.svg";
import Comment from "../../public/img/svg/posting/comment.svg";
import User from "../../public/img/svg/posting/user/post-user.svg";
import { useSelector } from "../../store";
import { useDispatch } from "react-redux";
import rightPost, { postModalActions } from "../../store/postModal";
import RightPost from "../post/RightPost";
import {
  getCommentsAPI,
  getPostAPI,
  getRecommendPostAPI,
} from "../../lib/api/post";
import usePortal from "../../hooks/usePortal";
import * as React from "react";
import PostModal from "../post/PostModal";
import formatDistance from "date-fns/formatDistance";
import comment, { commentActions } from "../../store/comment";
import { getRecommendPostListAPI } from "../../lib/api/posting";
import { subPostsActions } from "../../store/subPost";
import { postType } from "../../types/post";
import { array, arrayOf } from "prop-types";

const Container = styled.div`
  margin-left: 50%;
  width: 100%;
  cursor: pointer;
  .post-wrapper {
    background-color: white;
    display: flex;
    padding: 12px;
    width: 50%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.58);
    margin-bottom: 35px;
    padding: 50px 50px 50px 0px;

    .post-right-block {
      width: 100%;
      padding-left: 50px;
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

  const dispatch = useDispatch();

  const { closeModalPortal, openModalPortal, ModalPortal } = usePortal();

  const onClickPost = async (postID: number) => {
    dispatch(postModalActions.setPostClicked());
    const { data } = await getPostAPI(postID);
    dispatch(postModalActions.setPostDetail(data));
    const comments = await getCommentsAPI(postID);
    dispatch(commentActions.setcomments(comments.data));
    const RecommendPost = await getRecommendPostAPI(postID);
    dispatch(subPostsActions.setsubPosts(RecommendPost.data.slice(0, 2)));
    openModalPortal();
  };

  return (
    <Container>
      <ul>
        {Array.isArray(posts) &&
          posts.map((post) => (
            <li
              className="post-wrapper"
              key={post.consolePostId}
              onClick={() => onClickPost(post.consolePostId)}
            >
              <div className="post-right-block">
                <div className="post-header">
                  <div className="post-title-time">
                    <div className="post-title">
                      {post.title.length < 25
                        ? post.title
                        : `${post.title.slice(0, 25)}...`}
                    </div>
                    <div className="post-time">
                      {formatDistance(new Date(post.createdAt), new Date(), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                  <div className="post-subCategory">{post.subCategory}</div>
                </div>
                <div className="post-contents">
                  {post.contents.length < 500
                    ? post.contents
                    : `${post.contents.slice(0, 500)}...`}
                </div>
                <div className="post-footer">
                  <div className="post-footer-user">
                    <User
                      style={{ fill: "rgb(150,150,150)" }}
                      className="post-footer-user-svg"
                    />
                    Posted by {post.email}
                  </div>
                  <div className="post-footer-comments"></div>
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
