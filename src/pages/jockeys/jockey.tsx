import styled from "@emotion/styled";
import { maxWidth, mediaQuery, Workshop } from "../../design-system";
import Detail from "./components/detail";
import List from "./components/list";

const Jockeys = () => {
  return (
    <Container>
      <Workshop>
        {/* <Detail /> */}
        <List />
      </Workshop>
    </Container>
  );
};

const Container = styled.div({
  [mediaQuery.large]: {
    maxWidth: maxWidth.large,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default Jockeys;
