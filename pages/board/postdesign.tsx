import Posts from "../../components/posts/Posts";
import { NextPage } from "next";
import styled from "styled-components";

const Container = styled.div`
  padding: 50px 100px 40px;
  .;
`;

const data = [
  {
    id: 1,
    likes: 16,
    comments: 100,
    mainCategoryType: "asadf",
    subCategoryType: "국가안전",
    anonymousType: "email",
    email: "daehwa001210@gmail.com",
    title: "국가안전보장에 관련되는 대외정책·군사정책",
    contents:
      "잠, 나의 라이너 이런 못 있습니다. 어머니 못 별 써 위에 남은 봅니다. 이런 별빛이 된 이름을 있습니다. 토끼, 다하지 못 어머니 하나 위에 있습니다. 내일 강아지, 아스라히 차 토끼, 속의 한 가득 거외다. 밤이 별 아름다운 겨울이 시와 이제 가슴속에 봅니다. 불러 별에도 덮어 마디씩 별 까닭입니다. 내일 이름과, 위에도 내 까닭입니다. 청춘이 하나에 까닭이요, 패, 아무 이름과, 동경과 버리었습니다.같이 동경과 못 이웃 하나 때 헤는 내린 있습니다. 나의 가을 그러나 어머님, 마디씩 토끼, 시와 까닭입니다. 한 불러 겨울이 봅니다. 가슴속에 다 묻힌 된 내린 비둘기, 이름과 거외다. 써 불러 벌써 별 봅니다. 아스라히 릴케 무덤 까닭이요, 보고, 아침이 않은 못 가난한 봅니다. 못 이런 밤이 때 했던 노루, 거외다. 하나에 이름자 별 언덕 봄이 풀이 언덕 없이 아무 까닭입니다. 별들을 하나의 그리고 지나가는 마디씩 버리었습니다. 릴케 풀이 아스라히 파란 별 겨울이 멀리 시인의 별들을 까닭입니다. 별 강아지, 피어나듯이 어머니, 때 봄이 오는 이름과 계십니다. 피어나듯이 이네들은 위에 패, 버리었습니다. 아침이 책상을 프랑시스 같이 남은 마디씩 이웃 그리고 가을로 봅니다. 너무나 멀듯이, 애기 하나에 보고, 가슴속에 이름을 별 별이 거외다. 우는 나는 지나가는 추억과 사람들의 불러 이국 쓸쓸함과 버리었습니다. 봄이 경, 아름다운 소학교 까닭입니다. 아침이 비둘기, 내일 듯합니다. 불러 그리워 부끄러운 남은 소녀들의 봅니다. 잠, 어머니, 라이너 별빛이 까닭이요, 하늘에는 버리었습니다. 이름자를 이 프랑시스 동경과 가슴속에 별 이름을 위에 풀이 있습니다.",
  },
  {
    id: 2,
    likes: 16,
    comments: 60,
    mainCategoryType: "aqwer",
    subCategoryType: "내정책",
    anonymousType: "emailqwer",
    email: "daehwa00121rqwe0@gmail.com",
    title: "내정책의 수립에 관하여 국무회의의",
    contents:
      "잠, 나의 라이너 이런 못 있습니다. 어머니 못 별 써 위에 남은 봅니다. 이런 별빛이 된 이름을 있습니다. 토끼, 다하지 못 어머니 하나 위에 있습니다. 내일 강아지, 아스라히 차 토끼, 속의 한 가득 거외다. 밤이 별 아름다운 겨울이 시와 이제 가슴속에 봅니다. 불러 별에도 덮어 마디씩 별 까닭입니다. 내일 이름과, 위에도 내 까닭입니다. 청춘이 하나에 까닭이요, 패, 아무 이름과, 동경과 버리었습니다.같이 동경과 못 이웃 하나 때 헤는 내린 있습니다. 나의 가을 그러나 어머님, 마디씩 토끼, 시와 까닭입니다. 한 불러 겨울이 봅니다. 가슴속에 다 묻힌 된 내린 비둘기, 이름과 거외다. 써 불러 벌써 별 봅니다. 아스라히 릴케 무덤 까닭이요, 보고, 아침이 않은 못 가난한 봅니다. 못 이런 밤이 때 했던 노루, 거외다. 하나에 이름자 별 언덕 봄이 풀이 언덕 없이 아무 까닭입니다. 별들을 하나의 그리고 지나가는 마디씩 버리었습니다. 릴케 풀이 아스라히 파란 별 겨울이 멀리 시인의 별들을 까닭입니다. 별 강아지, 피어나듯이 어머니, 때 봄이 오는 이름과 계십니다.피어나듯이 이네들은 위에 패, 버리었습니다. 아침이 책상을 프랑시스 같이 남은 마디씩 이웃 그리고 가을로 봅니다. 너무나 멀듯이, 애기 하나에 보고, 가슴속에 이름을 별 별이 거외다. 우는 나는 지나가는 추억과 사람들의 불러 이국 쓸쓸함과 버리었습니다. 봄이 경, 아름다운 소학교 까닭입니다. 아침이 비둘기, 내일 듯합니다. 불러 그리워 부끄러운 남은 소녀들의 봅니다. 잠, 어머니, 라이너 별빛이 까닭이요, 하늘에는 버리었습니다. 이름자를 이 프랑시스 동경과 가슴속에 별 이름을 위에 풀이 있습니다.",
  },
  {
    id: 3,
    likes: 16,
    comments: 100,
    mainCategoryType: "a",
    subCategoryType: "헌법",
    anonymousType: "email",
    email: "daehwa001210@gmail.com",
    title: "제2항의 찬성을 얻은 때에는 헌법개정",
    contents:
      "잠, 나의 라이너 이런 못 있습니다. 어머니 못 별 써 위에 남은 봅니다. 이런 별빛이 된 이름을 있습니다. 토끼, 다하지 못 어머니 하나 위에 있습니다. 내일 강아지, 아스라히 차 토끼, 속의 한 가득 거외다. 밤이 별 아름다운 겨울이 시와 이제 가슴속에 봅니다. 불러 별에도 덮어 마디씩 별 까닭입니다. 내일 이름과, 위에도 내 까닭입니다. 청춘이 하나에 까닭이요, 패, 아무 이름과, 동경과 버리었습니다.같이 동경과 못 이웃 하나 때 헤는 내린 있습니다. 나의 가을 그러나 어머님, 마디씩 토끼, 시와 까닭입니다. 한 불러 겨울이 봅니다. 가슴속에 다 묻힌 된 내린 비둘기, 이름과 거외다. 써 불러 벌써 별 봅니다. 아스라히 릴케 무덤 까닭이요, 보고, 아침이 않은 못 가난한 봅니다. 못 이런 밤이 때 했던 노루, 거외다. 하나에 이름자 별 언덕 봄이 풀이 언덕 없이 아무 까닭입니다. 별들을 하나의 그리고 지나가는 마디씩 버리었습니다. 릴케 풀이 아스라히 파란 별 겨울이 멀리 시인의 별들을 까닭입니다. 별 강아지, 피어나듯이 어머니, 때 봄이 오는 이름과 계십니다.피어나듯이 이네들은 위에 패, 버리었습니다. 아침이 책상을 프랑시스 같이 남은 마디씩 이웃 그리고 가을로 봅니다. 너무나 멀듯이, 애기 하나에 보고, 가슴속에 이름을 별 별이 거외다. 우는 나는 지나가는 추억과 사람들의 불러 이국 쓸쓸함과 버리었습니다. 봄이 경, 아름다운 소학교 까닭입니다. 아침이 비둘기, 내일 듯합니다. 불러 그리워 부끄러운 남은 소녀들의 봅니다. 잠, 어머니, 라이너 별빛이 까닭이요, 하늘에는 버리었습니다. 이름자를 이 프랑시스 동경과 가슴속에 별 이름을 위에 풀이 있습니다.",
  },
];

const PostList: NextPage = () => {
  return (
    <Container>
      <Posts posts={data} />
    </Container>
  );
};

export default PostList;
