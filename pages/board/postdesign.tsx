import { NextPage } from "next";
import styled from "styled-components";
import React, { useRef } from "react";
import Posts from "../../components/posts/Posts";
import { useSelector, wrapper } from "../../store";
import { searchActions } from "../../store/search";
import SearchBar from "../../components/common/SearchBar";
import { useDispatch } from "react-redux";
import { getPostListAPI } from "../../lib/api/posting";
import { postsActions } from "../../store/posts";

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

const PostList: NextPage = () => {
  const posts = useSelector((state) => state.posts.posts);

  const dispatch = useDispatch();

  const page = useRef<number>(1);

  //* 검색된 keyword 클릭시
  const onPagiNation = async (order: string) => {
    try {
      order === "Prev" && (page.current -= 1);
      order === "Next" && (page.current += 1);
      const { data } = await getPostListAPI(
        posts[0].mainCategory.concat("/", posts[0].subCategory),
        page.current
      );
      dispatch(postsActions.setPosts(data));
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
            disabled={page.current == 1}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={posts.length < 10}
            onClick={() => onPagiNation("Next")}
          >
            Next
          </button>
        </div>
      )}
    </Container>
  );
};

export default PostList;
