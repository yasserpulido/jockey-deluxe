import styled from "@emotion/styled";
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
  border: "1px solid black",
});

export default Jockeys;
