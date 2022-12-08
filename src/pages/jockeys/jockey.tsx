import styled from "@emotion/styled";
import { maxWidth, mediaQuery } from "../../design-system";
import Detail from "./components/detail";
import List from "./components/list";

const Jockeys = () => {
  return (
    <Container>
      <Detail />
      {/* <List /> */}
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
