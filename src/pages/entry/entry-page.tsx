import styled from "@emotion/styled";
import { maxWidth, mediaQuery, Workshop } from "../../design-system";
import { Detail } from "./components";

const EntryPage = () => {
  return (
    <Container>
      <Workshop>
        <Detail />
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

export default EntryPage;
