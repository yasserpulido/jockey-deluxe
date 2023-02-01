import styled from "@emotion/styled";
import { maxWidth, mediaQuery, Workshop } from "../../design-system";
import { Detail } from "./components/detail-test";
import { List } from "./components/list-test";

const Breed = () => {
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
    maxWidth: maxWidth.medium,
  },
});

export default Breed;
