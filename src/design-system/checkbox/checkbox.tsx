import styled from "@emotion/styled";
import React from "react";
import { colors } from "../theme";

type Props = {
  label: string;
  name: string;
  checked?: string;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
};

const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      name,
      value,
      checked = "unchecked",
      disabled = false,
      onChange,
      ...props
    },
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
          checked={checked === "checked"}
          onChange={(e) => onChange(e.target.checked ? "checked" : "unchecked")}
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
  position: "absolute",
  opacity: 0,

  "& + label": {
    position: "relative",
    cursor: "pointer",
    padding: 0,
  },

  "& + label:before": {
    content: '""',
    display: "inline-block",
    width: "1rem",
    height: "1rem",
    marginRight: "0.5rem",
    verticalAlign: "text-top",
    backgroundColor: colors.White,
    border: `1px solid ${colors.Black}`,
  },

  "&:checked + label:before": {
    backgroundColor: colors.DenimBlue,
  },

  "&:disabled + label": {
    color: colors.FrenchGrey,
    cursor: "auto",
  },

  "&:disabled + label:before": {
    backgroundColor: colors.FrenchGrey,
  },

  "&:checked + label:after": {
    content: '""',
    position: "absolute",
    left: "0.15rem",
    top: "0.45rem",
    backgroundColor: "white",
    width: "2px",
    height: "2px",
    boxShadow:
      "2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white",
    transform: "rotate(45deg)",
  },
});

export default Checkbox;
