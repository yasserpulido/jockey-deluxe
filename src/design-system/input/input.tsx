import React from "react";
import styled from "@emotion/styled";
import { colors } from "../theme/colors";

type Props = {
  label: string;
  name: string;
  value: string;
  type?: React.InputHTMLAttributes<HTMLButtonElement>["type"];
  placeholder?: string;
};

const Input = React.forwardRef(
  ({ label, name, type, placeholder, ...props }: Props, ref) => {
    const hasDate = props.value === "";

    return (
      <FormGroup hasDate={hasDate}>
        <label htmlFor={name}>{label}:</label>
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          {...ref}
          {...props}
        />
      </FormGroup>
    );
  }
);

type FormGroupProps = {
  hasDate: boolean;
};

const FormGroup = styled.div<FormGroupProps>(({ hasDate }) => ({
  borderBottom: `2px solid ${colors.Black}`,
  marginBottom: "1rem",

  "& label": {
    display: "block",
    marginBottom: "0.2rem",
  },

  "& input": {
    borderRadius: 0,
    border: `1px solid ${colors.Gunmetal}`,
    fontSize: "1.2em",
    padding: "0.2rem 0.4rem",
    width: "100%",

    ":focus": {
      outline: `2px solid ${colors.DenimBlue}`,
    },

    "::placeholder": {
      color: colors.Gunmetal,
      opacity: 0.5,
    },
  },

  "& input[type='date']": {
    color: !hasDate ? colors.Black : colors.Gunmetal,
    opacity: !hasDate ? 1 : 0.5,
    fontSize: "1.2em",
  },
}));

export default Input;
