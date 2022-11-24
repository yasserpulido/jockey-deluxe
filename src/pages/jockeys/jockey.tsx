import styled from "@emotion/styled";
import { colors } from "../../styles/theme/colors";
import Detail from "./components/detail";
import List from "./components/list";

const Jockeys = () => {
  return (
    <Container>
      <Detail />
      <List />
    </Container>
  );
};

const Container = styled.div({
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: colors.Black,
});

export default Jockeys;
