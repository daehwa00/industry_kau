import { NextPage } from "next";
import styled from "styled-components";
import React from "react";
import { getpostAPI } from "../../lib/api/posting";
import Posts from "../../components/posts/Posts";
import { wrapper } from "../../store";
import { searchActions } from "../../store/search";
import SearchBar from "../../components/common/SearchBar";

const Container = styled.div`
  padding: 50px 100px 40px;
  .;
`;

const PostList: NextPage = () => {
  const body = {
    mainCategory: "대분류2",
    pageNumber: 1,
  };
  return (
    <Container>
      <SearchBar />
      <Posts body={body} />
    </Container>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, query }) => {
    const { mainCategory, page } = query;
    try {
      await getpostAPI(postBody);
    } catch (e) {
      console.log("오류");
    }
  }
);

export default PostList;
