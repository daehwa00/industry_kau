import { NextPage } from "next";
import styled from "styled-components";
import User from "../../public/static/svg/posting/user/post-user.svg";
import Comment from "../../public/static/svg/posting/comment.svg";
import { useSelector } from "../../store";
<<<<<<< HEAD
import UpArrow from "../../public/static/svg/posting/posting-up-arrow.svg";
import DownArrow from "../../public/static/svg/posting/posting-down-arrow.svg";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Typography } from "@mui/material";

const Container = styled.div`
  overflow: auto;
  font-size: 16px;
  text-align: left;
  color: #00004d;
  fornt-weight: 300;
  .line {
    height: 12px;
    box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.2);
  }
  .line2 {
    border: 0;
    height: 1px;
    margin-bottom: 10px;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0)
    );
  }
  .post-title {
    font-size: 30px;
=======
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
>>>>>>> a5b70ca730b2ff96aa3996016cd1d860a10f6822
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
<<<<<<< HEAD
      <div className="line" />
      <div className="post-content">{post.contents}</div>
      <div className="line2" />
      <div className="post-left-block">
        <UpArrow style={{ fill: "rgb(42,169,224)" }} className="post-arrow" />
        <div className="post-likes">22</div>
        <DownArrow className="post-arrow" />
      </div>
      <div className="post-passing">다음글</div>
      <div className="post-passing">이전글</div>
      <div className="post-comment">
        <Comment />
        댓글 (number)
        <Accordion disableGutters>
          <AccordionSummary expandIcon={<DownArrow />}>
            <Typography>댓글</Typography>
          </AccordionSummary>
          <AccordionDetails>ㅁㄴㅁㄴ</AccordionDetails>
        </Accordion>
=======
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
>>>>>>> a5b70ca730b2ff96aa3996016cd1d860a10f6822
      </div>
    </Container>
  );
};

export default PostModal;
