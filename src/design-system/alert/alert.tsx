import styled from "@emotion/styled";

interface Props {
  text: string;
  variant: "Primary" | "Danger" | "Warning" | "Success";
}

const Alert = ({ text, variant }: Props) => {
  return <Container variant={variant}>{text}</Container>;
};

type ContainerProps = {
  variant: string;
};

const Container = styled.div<ContainerProps>(({ variant }) => ({}));

export default Alert;
