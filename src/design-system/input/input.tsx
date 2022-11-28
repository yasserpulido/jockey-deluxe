import styled from "@emotion/styled";
import React from "react";
import { colors } from "../theme/colors";

type Props = {
  label: string;
  name: string;
  type?: React.InputHTMLAttributes<HTMLButtonElement>["type"];
  placeholder?: string;
};

const Input = React.forwardRef(
  ({ label, name, type, placeholder, ...props }: Props, ref) => {
    return (
      <FormGroup>
        <label htmlFor={name}>{label}:</label>
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          {...props}
          {...ref}
        />
      </FormGroup>
    );
  }
);

const FormGroup = styled.div({
  marginBottom: "1.4rem",

  "& label": {
    display: "block",
    marginBottom: "0.4rem",
  },

  "& input": {
    borderRadius: 0,
    border: `1px solid ${colors.Gunmetal}`,
    fontSize: "1rem",
    padding: "0.7rem 0.5rem",
    outline: 0,
    width: "100%",

    "&:focus": {
      border: `2px solid ${colors.BlueDress}`,
    },
  },
});

export default Input;
