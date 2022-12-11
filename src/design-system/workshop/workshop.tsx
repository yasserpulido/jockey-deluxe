import styled from "@emotion/styled";
import React from "react";
import { colors } from "../theme";

type Props = {
  children: React.ReactNode;
};

const Workshop = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Container = styled.div({
  border: `1px solid ${colors.Black}`,
  padding: "1rem",
});

export default Workshop;
