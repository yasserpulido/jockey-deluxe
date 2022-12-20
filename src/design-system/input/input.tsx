import React from "react";
import styled from "@emotion/styled";
import { colors } from "../theme/colors";
import { GrStatusWarning } from "react-icons/gr";
import { fontWeight } from "../theme";

type Props = {
  label: string;
  name: string;
  value?: string;
  errors?: string;
  type?: React.InputHTMLAttributes<HTMLButtonElement>["type"];
  placeholder?: string;
  onChange: (value: string) => void;
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      name,
      value,
      errors,
      type,
      placeholder = "Type here",
      onChange,
      ...props
    },
    ref
  ) => {
    const hasDate = value !== "";

    return (
      <Container>
        <FormGroup hasDate={hasDate}>
          <label htmlFor={name}>{label}:</label>
          <input
            id={name}
            name={name}
            placeholder={placeholder}
            type={type}
            ref={ref}
            onChange={(e) => onChange(e.currentTarget.value)}
            value={value}
            {...props}
          />
        </FormGroup>
        {errors && (
          <Error>
            <GrStatusWarning />
            {errors}
          </Error>
        )}
      </Container>
    );
  }
);

const Container = styled.div({});

type FormGroupProps = {
  hasDate: boolean;
};

const FormGroup = styled.div<FormGroupProps>(({ hasDate }) => ({
  borderBottom: `2px solid ${colors.Black}`,
  marginBottom: "0.2rem",

  "& label": {
    display: "block",
    marginBottom: "0.2rem",
  },

  "& input": {
    border: `1px solid ${colors.Black}`,
    borderRadius: 0,
    fontSize: "1.2em",
    padding: "0",
    paddingLeft: "0.2rem",
    lineHeight: "1.5rem",
    width: "100%",
    fontWeight: fontWeight.regular,

    ":focus": {
      outline: `2px solid ${colors.DenimBlue}`,
    },

    "::placeholder": {
      color: colors.FrenchGrey,
      opacity: 1,
    },
  },

  "& input[type='date']": {
    color: hasDate ? colors.Black : colors.FrenchGrey,
    fontSize: "1.2em",
  },
}));

const Error = styled.small({
  color: colors.PersianRed,
  display: "flex",
  alignItems: "center",

  "& svg, path": {
    fontSize: "1rem",
    marginRight: "0.4rem",
    stroke: colors.PersianRed,
  },
});

export default Input;
