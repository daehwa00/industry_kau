import type { NextPage } from "next";
import styled from "styled-components";
import BackgroundSlider from "react-background-slider";


const Container = styled.div`
  font-size: 21px;
  color: gray;
  .context-wrapper {
    position: absolute;
    top: 45%;
    left: 15%;
    color: white;

    .first-context {
      font-size: 80px;
    }
    .second-context {
      font-size: 70px;
    }
  }
  .bot-position {
    display: flex;
    justify-content: right;
    padding-right:20px;
    padding-top: 20px;
  }
`;

const Index: NextPage = () => {
  
  return (
    <Container>
      <BackgroundSlider
        images={[
          "main/png/위로1.jpg",
          "main/png/위로2.jpg",
          "main/png/위로3.jpg",
          "main/png/위로4.jpg",
          "main/png/위로5.jpg",
        ]}
        duration={10}
        transition={2}
      />
      <div className="context-wrapper">
        <div className="first-context">모두에게 기쁨이 </div>
        <div className="second-context">찾아오는 그 순간까지</div>
      </div>
    </Container>
  );
};

export default Index;
