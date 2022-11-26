import styled from "@emotion/styled";
import { colors } from "../theme/colors";

type Props = {
  children: React.ReactNode;
  title: string;
};

const Card = ({ children, title }: Props) => {
  return (
    <Container>
      <Header>{title}</Header>
      <Content>{children}</Content>
    </Container>
  );
};

const Container = styled.div({
  border: `1px solid ${colors.DoveGrey}`,
});

const Header = styled.div({
  backgroundColor: colors.DoveGrey,
  color: colors.White,
  textAlign: "center",
  padding: "0.5rem 0",
});

const Content = styled.div({
  padding: "1rem",
});

export default Card;
