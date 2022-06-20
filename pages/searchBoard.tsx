import { NextPage } from "next";
import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import Posts from "../components/posts/Posts";
import { useSelector, wrapper } from "../store";
import SearchBar from "../components/common/SearchBar";
import { useDispatch } from "react-redux";
import { getPostListAPI } from "../lib/api/posting";
import { postsActions } from "../store/posts";
import {
  NotificationContainer,
  NotificationManager,
} from "../components/post/PostModal";
import AWN from "awesome-notifications";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .pagination {
    border: 1px solid rgba(27, 31, 35, 0.15);
    border-radius: 3px;
    width: fit-content;
    margin: auto;
    margin-top: 20px;
  }
  .pagination button {
    padding: 6px 12px;
    font-size: 14px;
    border: 0;
    color: black;
    font-weight: bold;
    cursor: pointer;
    outline: none;
  }
`;
const CheerupFail = () => {
  NotificationManager.warning(
    "다른 고민도 함께 위로해주세요 !",
    "이미 힘내요를 누르셨습니다"
  );
};

const PostList: NextPage = () => {
  const posts = useSelector((state) => state.posts.posts);

  const dispatch = useDispatch();

  const page = useRef<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const onPagiNation = async (order: string) => {
    try {
      console.log("현재페이지", page.current);
      order === "Prev" && (page.current -= 1);
      order === "Next" && (page.current += 1);
      const { data } = await getPostListAPI(posts[0].subCategory, page.current);
      if (data.length == 0) {
        alert("마지막 페이지입니다!");
        page.current -= 1;
      } else {
        dispatch(postsActions.setPosts(data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <SearchBar />
      <Posts />
      {posts.length !== 0 && (
        <div className="pagination">
          <button
            type="button"
            onClick={() => onPagiNation("Prev")}
            disabled={page.current === 0}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => onPagiNation("Next")}
            disabled={posts.length < 10}
          >
            Next
          </button>
        </div>
      )}
      <NotificationContainer />
    </Container>
  );
};

export default PostList;
