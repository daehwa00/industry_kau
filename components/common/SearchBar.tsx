import React, { useRef, useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "../../store";
import { searchActions } from "../../store/search";
import useDebounce from "../../hooks/useDebounce";
import palette from "../../styles/palette";
import { getPostListAPI, searchWordAPI } from "../../lib/api/posting";
import { postsActions } from "../../store/posts";
import { getRecommendPostListAPI } from "../../lib/api/posting";
import { NextPage } from "next";
import { getRecommendUserPostAPI } from "../../lib/api/post";

const Container = styled.div`
  background-color: white;
  position: relative;
  width: 50%;
  height: 100px;
  display: flex;
  border: 2px solid transparent;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.58);
  border-radius: 12px;
  cursor: pointer;
  margin-top: 100px;
  margin-bottom: 100px;
  &:hover {
    border-color: ${palette.gray_dd};
  }
  .search-mainCategory-bar-texts {
    position: absolute;
    width: calc(100%-40px);
    top: 16px;
    left: 20px;
    .search-mainCategory-bar-label {
      font-size: 15px;
      font-weight: 800;
      margin-bottom: 4px;
    }
    input {
      width: 100%;
      border: 0;
      font-size: 30px;
      font-weight: 600;
      outline: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &::placeholder {
        font-size: 30px;
        opacity: 0.7;
      }
    }
  }

  .search-roo-bar-searchWord-results {
    position: absolute;
    background-color: white;
    top: 78px;
    width: 50vw;
    padding: 16px 0;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    cursor: default;
    overflow: hiddden;
    z-index: 10;
    overflow-y: scroll;
    min-height: 64px;
    max-height: 400px;
    li {
      display: flex;
      align-items: center;
      height: 64px;
      padding: 8px 32px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
  }
  .search-roo-bar-searchWord-results::-webkit-scrollbar {
    background-color: transparent;
    width: 16px;
  }

  .search-roo-bar-searchWord-results::-webkit-scrollbar-track {
    background-color: transparent;
  }

  .search-roo-bar-searchWord-results::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 4px solid #fff;
  }

  .search-roo-bar-searchWord-results::-webkit-scrollbar-button {
    display: none;
  }
`;
const SearchBar: NextPage = () => {
  const [popupOpened, setPopupOpened] = useState(false);

  const searchWord = useSelector((state) => state.search.searchWord);

  const email = useSelector((state) => state.user.email);

  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchKeyword = useDebounce(searchWord, 150);

  //* ?????? ??????(??????????????????)
  const [results, setResults] = useState<
    {
      results: string;
    }[]
  >([]);

  // ?????? ??????????????? ???????????????.
  const searchingWord = async () => {
    try {
      const { data } = await searchWordAPI(searchWord);
      setResults(data);
    } catch (e) {
      console.log(e);
    }
  };

  //* input ?????? ????????? ?????????????????? ???
  const onClickInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setPopupOpened(true);
    const data = searchWordAPI(searchWord);
    console.log(data);
  };

  //* ????????? keyword ?????????
  const onClickResult = async (result) => {
    try {
      console.log(result);
      const { data } = await getPostListAPI(result);
      console.log(data);
      dispatch(postsActions.setPosts(data));
      setPopupOpened(false);
    } catch (e) {
      console.log(e);
    }
  };

  //* ?????? ????????? ?????????
  const onClickRecommendPost = async () => {
    try {
      const { data } = await getRecommendUserPostAPI(email);
      if (!Array.isArray(data)) {
        alert("?????? ????????? ????????? ?????? ????????????! ????????? ?????????????????????!");
      }
      dispatch(postsActions.setPosts(data));
      setPopupOpened(false);
    } catch (e) {
      console.log(e);
    }
  };

  //* ???????????? ????????? ???????????? ??????
  useEffect(() => {
    if (!searchKeyword) {
      setResults([]);
    }
    if (searchKeyword) {
      searchingWord();
    }
  }, [searchKeyword]);

  //* ?????? ?????? ?????? dispatch
  const setsearchWordDispatch = (value: string) => {
    dispatch(searchActions.setSearchWord(value));
  };

  return (
    <Container onClick={onClickInput}>
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <div className="search-mainCategory-bar-texts">
          <p className="search-mainCategory-bar-label">?????? ???????????? ?????????!</p>
          <input
            value={searchWord}
            onChange={(e) => setsearchWordDispatch(e.target.value)}
            placeholder="?????? ????????? ?????????????"
            ref={inputRef}
          />
        </div>
        {popupOpened && searchWord !== "?????? ?????????" && (
          <ul className="search-roo-bar-searchWord-results">
            {!searchWord && (
              <li role="presentation" onClick={() => onClickRecommendPost()}>
                ???????????? ??????????????????!
              </li>
            )}
            {!isEmpty(results) &&
              results.map((result) => (
                <li role="presentation" onClick={() => onClickResult(result)}>
                  <>{result}</>
                </li>
              ))}
          </ul>
        )}
      </OutsideClickHandler>
      <div className="search-bar-inputs" />
    </Container>
  );
};

export default SearchBar;
