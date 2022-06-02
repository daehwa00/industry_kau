import PageList from "./PageList";
import styled from "styled-components";

const Container = styled.div`
  font-size: 21px;
  color: gray;
  margin: 20;
  padding: 20;
`;

const Layout = (props) => (
  <Container>
    <PageList />
    {props.children}
  </Container>
);

export default Layout;
