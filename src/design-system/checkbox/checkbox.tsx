import styled from "@emotion/styled";
import React from "react";
import { colors } from "../theme";

type Props = {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
};

const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  (
    { label, name, value, checked, disabled = false, onChange, ...props },
    ref
  ) => {
    return (
      <Container>
        <Input
          id={name}
          name={name}
          type="checkbox"
          disabled={disabled}
          ref={ref}
          value={value}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          {...props}
        />
        <label htmlFor={name}>{label}</label>
      </Container>
    );
  }
);

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Input = styled.input({
  padding: 0,
  height: "initial",
  width: "initial",
  marginBottom: 0,
  display: "none",
  cursor: "pointer",

  "& + label": {
    position: "relative",
    cursor: "pointer",
  },

  "& + label:before": {
    content: '""',
    appearance: "none",
    backgroundColor: `${colors.White}`,
    border: `2px solid ${colors.Black}`,
    padding: "0.6rem",
    display: "inline-block",
    position: "relative",
    verticalAlign: "middle",
    cursor: "pointer",
    marginRight: "0.4rem",
  },

  "&:checked + label:before": {
    backgroundColor: `${colors.DenimBlue}`,
  },

  "&:checked + label:after": {
    content: '""',
    display: "block",
    position: "absolute",
    top: "0.15rem",
    left: "0.5rem",
    width: "6px",
    height: "14px",
    border: `solid ${colors.Black}`,
    borderWidth: "0 2px 2px 0",
    transform: "rotate(45deg)",
  },
});

export default Checkbox;
