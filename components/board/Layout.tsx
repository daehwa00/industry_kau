import PageList from "./PageList";
import styled from "styled-components";

const layoutStyle = {
  margin: 20,
  padding: 20,
};

const Container = styled.div`
  font-size: 21px;
  color: gray;
`;

const Layout = (props) => (
  <Container>
    <div style={layoutStyle}>
      <PageList />
      {props.children}
    </div>
  </Container>
);

export default Layout;
