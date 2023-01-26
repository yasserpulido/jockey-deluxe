import styled from "@emotion/styled";
import { FormClose } from "grommet-icons";
import { useEffect } from "react";
import { maxWidth, mediaQuery } from "../theme";
import { colors } from "../theme/colors";

type AlertProps = {
  status: {
    type: string;
    text: string;
  };
  reset: () => void;
};

const Alert = ({ status, reset }: AlertProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      reset();
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [reset]);

  return (
    <Container>
      <Content status={status.type}>
        <Text>{status.text}</Text>
        <IconContainer>
          <FormClose color={colors.White} onClick={reset} />
        </IconContainer>
      </Content>
    </Container>
  );
};

const Container = styled.div({
  position: "absolute",
  left: 0,
  bottom: 0,
  width: "100%",
  padding: "1rem",
});

type ContentProps = {
  status: string;
};

const Content = styled.div<ContentProps>(({ status }) => ({
  backgroundColor: status === "success" ? colors.GreenBlue : colors.PersianRed,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  margin: "0 auto",

  [mediaQuery.large]: {
    maxWidth: maxWidth.large,
  },
}));

const Text = styled.p({
  fontSize: "1rem",
  color: colors.White,
});

const IconContainer = styled.div({
  cursor: "pointer",
});

export default Alert;
