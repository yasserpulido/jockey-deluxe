import styled from "@emotion/styled";
import Detail from "./components/detail";
import List from "./components/list";
import { maxWidth, mediaQuery, Workshop } from "../../design-system";

const HumanPage = () => {
  return (
    <Container>
      <Workshop>
        <Detail />
        <List />
      </Workshop>
    </Container>
  );
};

const Container = styled.div({
  [mediaQuery.large]: {
    marginTop: "2rem",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: maxWidth.large,
  },
});

export default HumanPage;
