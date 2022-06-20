// 글을 등록하는 컴포넌트
import React, { useMemo } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import palette from "../../styles/palette";
import Selector from "../common/Selector";
import { worryOfKind } from "../../lib/staticData";
import { useSelector } from "../../store";
import { postingActions } from "../../store/posting";
import RadioGroup from "../common/RadioGroup";
import RegisterPostingFooter from "./footer/RegisterPostingFooter";
import RegisterPostingContents from "./RegisterPostingContents";
import { optionGroupUnstyledClasses } from "@mui/base";

const Container = styled.div`
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.58);
  float: left;
  margin: 0px 16% 80px 16%;
  padding: 50px 170px 0 100px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  .left {
    display: block;
    padding-right: 10%;
    h2 {
      font-size: 19px;
      font-weight: 800;
      margin-bottom: 56px;
    }
    h3 {
      font-weight: bold;
      color: ${palette.gray_76};
      margin-bottom: 6px;
    }
    .register-posting-wrapper {
      width: 320px;
      margin-bottom: 32px;
    }

    .anonymous-posting-radio {
      max-width: 485px;
      margin-bottom: 50px;
    }
  }
`;

const options = ["선택해주세요."];

const RegisterPostingOptions: React.FC = () => {
  const dispatch = useDispatch();

  //고민 대분류
  const mainCategoryType = useSelector(
    (state) => state.posting.mainCategoryType
  );

  //고민 소분류
  const subCategoryType = useSelector((state) => state.posting.subCategoryType);

  //익명 타입
  const anonymousType = useSelector((state) => state.posting.anonymousType);

  //작성 내용
  const title = useSelector((state) => state.posting.title);

  //고민 대분류 유형 변경시
  const onChangeMainCategoryType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(postingActions.setMainCategoryType(event.target.value));
  };

  //고민 대분류 유형 변경시 소분류 설정
  const onChangeSubCategoryType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(postingActions.setSubCategoryType(event.target.value));
  };

  //대분류 안의 소분류 options
  const subCategoryOptions = useMemo(() => {
    switch (mainCategoryType) {
      case "증상": {
        const { Symptom } = require("../../lib/staticData");
        return Symptom;
      }
      case "감정": {
        const { emotion } = require("../../lib/staticData");
        return emotion;
      }
      case "배경": {
        const { background } = require("../../lib/staticData");
        return background;
      }
      default:
        return [];
    }
  }, [mainCategoryType]);

  //익명 options
  const anonymousTypeRadioOptions = [
    {
      label: "익명으로 할래요",
      value: "anonymous",
      description: "이름을 밝히고 싶지 않을 때 사용해요",
    },
    {
      label: "닉네임으로 할래요",
      value: "nickname",
      description: "닉네임으로 활동하고 싶을 때 사용해요",
    },
    {
      label: "이메일으로 할래요",
      value: "email",
      description: "이메일로 따로 도움을 받고 싶을 때 사용해요",
    },
  ];

  //익명 타입 변경시
  const onChangeAnonymousType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = event;
    dispatch(
      postingActions.setAnonymousType(
        selected as unknown as "anonymous" | "nickname" | "email"
      )
    );
  };
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(postingActions.setTitle());
  };

  //모든 값이 있는지 확인하기
  const isValid = useMemo(() => {
    if (!mainCategoryType || !subCategoryOptions || !anonymousType) {
      return false;
    }
    return true;
  }, [mainCategoryType, subCategoryOptions, anonymousType]);

  return (
    <Container>
      <div className="left">
        <h2>어떤 고민이 있어요?</h2>
        <h3>힘들다 그쵸?</h3>
        <div className="register-posting-wrapper">
          <Selector
            isValid={!!mainCategoryType}
            type="register"
            value={mainCategoryType || undefined}
            defaultValue={options}
            disabledOptions={options}
            label="우선 뭐가 힘든지 말해볼래요?"
            options={worryOfKind}
            onChange={onChangeMainCategoryType}
          />
        </div>
        <div className="register-posting-wrapper">
          {mainCategoryType && (
            <Selector
              isValid={!!subCategoryType}
              type="register"
              value={subCategoryType || undefined}
              defaultValue={options}
              disabled={!mainCategoryType}
              disabledOptions={options}
              label="좀 더 자세하게 알고 싶어요"
              options={subCategoryOptions}
              onChange={onChangeSubCategoryType}
            />
          )}
        </div>
        <div className="anonymous-posting-radio">
          {subCategoryType && (
            <RadioGroup
              isValid={!!anonymousType}
              type="register"
              label="어떻게 말하고 싶어요?"
              value={anonymousType || undefined}
              disabled={!subCategoryType}
              options={anonymousTypeRadioOptions}
              onChange={onChangeAnonymousType}
            />
          )}
        </div>
      </div>
      {
        anonymousType && <RegisterPostingContents /> // sub 수정
      }
    </Container>
  );
};

export default RegisterPostingOptions;
