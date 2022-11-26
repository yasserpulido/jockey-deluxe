import styled from "@emotion/styled";
import { colors } from "../theme/colors";

type Props = {
  children: React.ReactNode;
  type: "Success" | "Danger" | "Warning";
};

const Alert = ({ children, type }: Props) => {
  return (
    <Container type={type}>
      <Content>{children}</Content>
    </Container>
  );
};

type ContainerProps = {
  type: string;
};

const Container = styled.div<ContainerProps>(({ type }) => ({
  backgroundColor:
    type === "Success"
      ? colors.GreenBlue
      : type === "Danger"
      ? colors.PersianRed
      : colors.ArylideYellow,
  border: "none",
  color: type === "Warning" ? colors.Black : colors.White,
  fontFamily: "inherit",
  fontSize: "1rem",
}));

const Content = styled.div({
  padding: "1rem",
});

export default Alert;
