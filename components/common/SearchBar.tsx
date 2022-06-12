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

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  border: 2px solid transparent;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.58);
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    border-color: ${palette.gray_dd};
  }
  .search-mainCategory-bar-texts {
    position: absolute;
    width: calc(100%-40px);
    top: 16px;
    left: 20px;
    .search-mainCategory-bar-label {
      font-size: 10px;
      font-weight: 800;
      margin-bottom: 4px;
    }
    input {
      width: 100%;
      border: 0;
      font-size: 14px;
      font-weight: 600;
      outline: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &::placeholder {
        font-size: 14px;
        opacity: 0.7;
      }
    }
  }
  .search-roo-bar-searchWord-results {
    position: absolute;
    background-color: white;
    top: 78px;
    width: 500px;
    padding: 16px 0;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    border-radius: 32px;
    cursor: default;
    overflow: hiddden;
    z-index: 10;
    overflow-y: scroll;
    height: 600px;
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
`;
const SearchBar: React.FC = () => {
  const [popupOpened, setPopupOpened] = useState(false);

  const searchWord = useSelector((state) => state.search.searchWord);

  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchKeyword = useDebounce(searchWord, 150);

  //* 검색 결과(서브카테고리)
  const [results, setResults] = useState<
    {
      results: string;
    }[]
  >([]);

  // 검색 미리보기를 반환합니다.
  const searchingWord = async () => {
    try {
      const { data } = await searchWordAPI(searchWord);
      setResults(data);
    } catch (e) {
      console.log(e);
    }
  };

  //* input 안에 커서가 깜빡거리도록 함
  const onClickInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setPopupOpened(true);
    const data = searchWordAPI(searchWord);
    console.log(data);
  };

  //* 검색된 keyword 클릭시
  const onClickResult = async (result: string) => {
    try {
      const { data } = await getPostListAPI(result);
      dispatch(postsActions.setPosts(data));
      setPopupOpened(false);
    } catch (e) {
      console.log(e);
    }
  };

  //* 근처 추천 장소 클릭시
  const onClickNearPlaces = () => {
    setPopupOpened(false);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocationDispatch("근처 추천 장소");
      },
      (e) => {
        console.log(e);
      }
    );
  };

  //* 검색어가 변하면 포스팅을 검색
  useEffect(() => {
    if (!searchKeyword) {
      setResults([]);
    }
    if (searchKeyword) {
      searchingWord();
    }
  }, [searchKeyword]);

  //* 검색 단어 변경 dispatch
  const setsearchWordDispatch = (value: string) => {
    dispatch(searchActions.setSearchWord(value));
  };

  return (
    <Container onClick={onClickInput}>
      <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
        <div className="search-mainCategory-bar-texts">
          <p className="search-mainCategory-bar-label">안녕</p>
          <input
            value={searchWord}
            onChange={(e) => setsearchWordDispatch(e.target.value)}
            placeholder="어떤 고민이 궁금해요?"
            ref={inputRef}
          />
        </div>
        {popupOpened && searchWord !== "추천 게시물" && (
          <ul className="search-roo-bar-searchWord-results">
            {!searchWord && (
              <li role="presentation" onClick={onClickNearPlaces}>
                추천하는 게시물이예요!
              </li>
            )}
            {!isEmpty(results) &&
              results.map((result) => (
                <li role="presentation" onClick={() => onClickResult(result)}>
                  {result}
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
