import styled from "@emotion/styled";
import { colors } from "../theme";
import { Add } from "grommet-icons";

const Panel = () => {
  return (
    <Container>
      <Header>
        <Title>Title</Title>
        <Add size="small" color="white" />
      </Header>
    </Container>
  );
};

const Container = styled.div({
  width: "100%",
});

const Header = styled.div({
  alignItems: "center",
  backgroundColor: colors.FrenchGrey,
  border: `1px solid ${colors.Black}`,
  display: "flex",
  justifyContent: "space-between",
  padding: "0.5rem 1rem",
  width: "inherit",
});

const Title = styled.span({
  fontWeight: "bold",
  textTransform: "capitalize",
  color: colors.White,
});

export default Panel;
