import { NextPage } from "next";
import styled, { css } from "styled-components";
import User from "../../public/img/svg/posting/user/post-user.svg";
import Comment from "../../public/img/svg/posting/comment.svg";
import { useSelector } from "../../store";
import palette from "../../styles/palette";
import UpArrow from "../../public/img/svg/posting/posting-up-arrow.svg";
import DownArrow from "../../public/img/svg/posting/posting-down-arrow.svg";
import formatDistance from "date-fns/formatDistance";
import ProgressBar from "@ramonak/react-progress-bar";
import Textarea from "../common/Textarea";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { commentActions } from "../../store/comment";
import { FaRegFrown, FaRegSmile, FaReply } from "react-icons/fa";
import {
  createCheerUpAPI,
  createCommentAPI,
  getCommentsAPI,
} from "../../lib/api/post";
import React from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

type onClickedHeart = { onClickedHeart: boolean };

const Container = styled.div<onClickedHeart>`
  width: 75vw;
  height: 65vh;
  .mainPost {
    float: left;
    width: 50vw;
    height: 800px;
    cursor: pointer;
    background-color: white;
    display: flex;
    height: auto;
    margin-bottom: 20px;
    .post-left-block {
      margin: 0px 32px 0px 30px;
      .HeartAnimation {
        padding-top: 2em;
        background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/66955/web_heart_animation.png");
        background-repeat: no-repeat;
        background-size: 3000%;
        background-position: left;
        height: 75px;
        width: 75px;
        margin: 0 auto;
        cursor: pointer;
        ${({ onClickedHeart }) => {
          if (onClickedHeart) {
            return css`
              animation: heart-burst 0.8s steps(28) forwards;

              @keyframes heart-burst {
                0% {
                  background-position: left;
                }
                100% {
                  background-position: right;
                }
              }
            `;
          }
        }}
      }
    }
    .post-right-block {
      width: 100%;
      .post-header {
        display: flex;
        justify-content: space-between;
        height: 40px;
        margin-bottom: 2vh;
        .post-title-time {
          .post-title {
            font-size: 30px;
            font-weight: 800;
            padding-bottom: 5px;
          }
          .post-time {
            font-size: 13px;
          }
        }
        .post-subCategory-bar {
          position: relative;
          .post-subCategory {
            font-size: 16px;
            font-weight: bold;
            color: ${palette.gray_71};
          }
        }
      }
      .post-contents {
        max-height: 30vh;
        overflow-y: auto;
        font-size: 18px;
        margin-top: 5vh;
        margin-bottom: 6vh;
        line-height: 200%;
        color: ${palette.gray};
      }
      .post-footer {
        display: flex;
        justify-content: space-between;
        height: 40px;
        display: flex;
        align-items: center;
        font-size: 8px;
        padding-bottom: 40px;
        position: relative;
        color: ${palette.gray_76};
        .post-footer-user {
          display: flex;
          align-items: center;
          font-size: 12px;
          .post-footer-user-svg {
            margin-right: 10px;
          }
        }
        .post-footer-gauge {
          position: relative;
          right: 0;
          .icons {
            display: flex;
            justify-content: space-between;
            padding-bottom: 5px;
          }
        }
      }
      .post-footer-comment-input {
        position: relative;
        .icon {
          position: absolute;
          right: 15px;
          top: 13px;
          z-index: 100;
        }
        margin-bottom: 3vh;
      }
      .post-footer-comments {
        overflow-y: auto;
        max-height: 30vh;
        .comment-wrapper {
          margin-bottom: 1.5vh;
          .comment-header {
            display: flex;
            margin-bottom: 1vh;
            .comment-user-svg {
            }
            .comment-user-time {
              margin-left: 10px;
              .comment-user {
                font-size: 12px;
                font-weight: bold;
                margin-bottom: 3px;
              }
              .comment-time {
                font-size: 7px;
                color: ${palette.gray_71};
              }
            }
          }
        }
        .comment-contents {
          font-size: 11px;
        }
      }
      .post-footer-comments::-webkit-scrollbar {
        background-color: transparent;
        width: 16px;
      }

      .post-footer-comments::-webkit-scrollbar-track {
        background-color: transparent;
      }

      .post-footer-comments::-webkit-scrollbar-thumb {
        background-color: #babac0;
        border-radius: 16px;
        border: 4px solid #fff;
      }

      .post-footer-comments::-webkit-scrollbar-button {
        display: none;
      }
    }
  }

  .subPost-wrapper {
    width: 22vw;
    float: right;
    .subPost-label {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 3vh;
    }
    .subPost {
      display: inline-block;
      width: 20vw;
      max-height: 20vh;
      margin-bottom: 1vh;
      margin-top: 3vh;
      .subPost-header {
        display: flex;
        justify-content: space-between;
        height: 40px;
        margin-bottom: 2vh;
        .subPost-title-time {
          .subPost-title {
            font-size: 20px;
            font-weight: 800;
            padding-bottom: 5px;
          }
          .subPost-time {
            font-size: 12px;
          }
        }
        .subPost-subCategory-bar {
          position: relative;
          .subPost-subCategory {
            font-size: 15px;
            font-weight: bold;
            color: ${palette.gray_71};
          }
        }
      }
      .subPost-contents {
        font-size: 15px;
        margin-bottom: 3vh;
        line-height: 200%;
        color: ${palette.gray};
      }
    }
  }
`;
const PostingSuccess = () => {
  NotificationManager.success(
    "다른 고민도 함께 보러 가볼까요?",
    "글 작성 완료!"
  );
};

const CommentSuccess = () => {
  NotificationManager.success(
    "다른 고민도 함께 보러 가볼까요?",
    "댓글 작성 완료!"
  );
};
const CheerupFail = () => {
  NotificationManager.warning(
    "다른 고민도 함께 위로해주세요 !",
    "이미 힘내요를 누르셨습니다"
  );
};

const LoginSuccess = () => {
  NotificationManager.info("로그인 성공");
};

interface IProps {
  closeModalPortal: () => void;
}

const PostModal: NextPage<IProps> = ({ closeModalPortal }) => {
  const post = useSelector((state) => state.postModal.postDetail);
  const comments = useSelector((state) => state.comment.comments);
  const email = useSelector((state) => state.user.email);
  const subPosts = useSelector((state) => state.subPosts.subPosts);

  const [comment, setComment] = useState("");

  const [clickedHeart, onClickedHeart] = useState(false);

  const dispatch = useDispatch();

  const animationButton = async (postID: number) => {
    onClickedHeart(!clickedHeart);
    await createCheerUpAPI({ consolePostId: postID, email });
  };

  const onSubmitComment = async (e) => {
    if (e.code == "Enter" && e.ctrlKey) {
      const now = new Date();
      const at = now.toString();
      dispatch(
        commentActions.setcomments([
          ...comments,
          {
            commentId: 0,
            createdAt: at,
            updatedAt: at,
            status: "ACTIVE",
            contents: comment,
            email,
            anonymous: 0,
            consolePostId: post.consolePostId,
          },
        ])
      );
      createCommentAPI({
        contents: comment,
        consolePostId: post.consolePostId,
        email,
        anonymous: 0,
      });
      setComment("");
      dispatch(commentActions.setInitInputComment());
      CommentSuccess();
    }
  };

  const onSubmitCommentClick = async (e) => {
    createCommentAPI({
      contents: comment,
      consolePostId: post.consolePostId,
      email,
      anonymous: 0,
    });
    setComment("");
    dispatch(commentActions.setInitInputComment());
    const comments = await getCommentsAPI(post.consolePostId);
    dispatch(commentActions.setcomments(comments.data));
    CommentSuccess();
  };

  return (
    <Container onClickedHeart={clickedHeart}>
      <div className="mainPost">
        <div className="post-left-block">
          <div
            className="HeartAnimation"
            onClick={() => {
              animationButton(post.consolePostId);
            }}
          />
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
                style={{ fill: "rgb(150,150,150)" }}
                className="post-footer-user-svg"
              />
              {post.anonymous == 0 && `익명`}
              {post.anonymous == 1 && `Posted by ${post.email}`}
            </div>
            <div className="post-footer-gauge">
              <div className="icons">
                <FaRegSmile size="18" />
                <FaRegFrown size="18" />
              </div>
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
          <div className="post-footer-comment-input">
            <form>
              <AiOutlineEnter
                className="icon"
                onClick={(e) => onSubmitCommentClick(e)}
              />
              <Textarea
                value={comment}
                isValid={!!comment}
                type="title"
                style={{ backgroundColor: "#FAFAFA" }}
                onChange={(e) => {
                  setComment(e.target.value);
                  dispatch(commentActions.setInputComment(e.target.value));
                }}
                placeholder="댓글을 입력해주세요"
                onKeyPress={onSubmitComment}
              />
            </form>
          </div>
          <div className="post-footer-comments">
            <ul>
              {comments.map((comment) => (
                <div className="comment-wrapper">
                  <div className="comment-header">
                    <User
                      style={{ fill: "rgb(211,211,211)" }}
                      className="comment-user-svg"
                      width="3%"
                      height="3%"
                      viewBox="0 0 24 24"
                      fill="none"
                    />
                    <div className="comment-user-time">
                      <div className="comment-user">
                        {comment.email.split("@")[0]}
                      </div>
                      <div className="comment-time">
                        {formatDistance(
                          new Date(comment.createdAt),
                          new Date(),
                          {
                            addSuffix: true,
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="comment-contents">{comment.contents}</div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="subPost-wrapper">
        <div className="subPost-label">이 글이 마음에 드셨나요?</div>
        {subPosts.map((subPost) => (
          <>
            <div className="subPost">
              <div className="subPost-header">
                <div className="subPost-title-time">
                  <div className="subPost-title">
                    {subPost.title.length < 10
                      ? subPost.title
                      : `${subPost.title.slice(0, 10)}...`}
                  </div>
                  <div className="subPost-time">
                    {formatDistance(new Date(subPost.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <div className="subPost-subCategory-bar">
                  <div className="subPost-subCategory">
                    {subPost.subCategory}
                  </div>
                </div>
              </div>
              <div className="subPost-contents">
                {subPost.contents.length < 100
                  ? subPost.contents
                  : `${subPost.contents.slice(0, 150)}...`}
              </div>
            </div>
            <hr />
          </>
        ))}
      </div>
    </Container>
  );
};

export default PostModal;
export {
  NotificationContainer,
  NotificationManager,
  CheerupFail,
  PostingSuccess,
  LoginSuccess,
};
