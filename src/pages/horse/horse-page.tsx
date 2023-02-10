import styled from "@emotion/styled";
import { maxWidth, mediaQuery, Workshop } from "../../design-system";
import { List } from "./components/list";

const HorsePage = () => {
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

export default HorsePage;
