import { NextPage } from "next";
import styled from "styled-components";
import React, { useState } from "react";
import Posts from "../../components/posts/Posts";
import { wrapper } from "../../store";
import { searchActions } from "../../store/search";
import SearchBar from "../../components/common/SearchBar";
import palette from "../../styles/palette";
import BackgroundSlider from "react-background-slider-background-fixed";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 100px 40px;
`;

const PostList: NextPage = () => {
  const [postClicked, setPostClicked] = useState("");
  return (
    <Container>
      <SearchBar />
      <Posts />
    </Container>
  );
};

export default PostList;
