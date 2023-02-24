import styled from "@emotion/styled";
import { maxWidth, mediaQuery, Workshop } from "../../design-system";
import { Detail, List } from "./components";

const CategoryPage = () => {
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

export default CategoryPage;
