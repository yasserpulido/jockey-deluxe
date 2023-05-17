import React from "react";
import styled from "@emotion/styled";
import { colors } from "../theme/colors";
import { fontWeight } from "../theme";
import { Alert } from "grommet-icons";

type Props = {
  label: string;
  name: string;
  value?: string | number;
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
      errors = "",
      type = "text",
      placeholder = "Type here",
      onChange,
      ...props
    },
    ref
  ) => {
    const hasDate = value !== "";

    return (
      <Container>
        <FormGroup>
          <Label htmlFor={name}>{label}:</Label>
          <InputBase
            id={name}
            name={name}
            placeholder={placeholder}
            type={type}
            ref={ref}
            onChange={(e) => onChange(e.currentTarget.value)}
            value={value}
            hasDate={hasDate}
            {...props}
          />
        </FormGroup>
        {errors !== "" && (
          <Error>
            <Alert size="small" />
            {errors}
          </Error>
        )}
      </Container>
    );
  }
);

const Container = styled.div({});

const FormGroup = styled.div({
  borderBottom: `2px solid ${colors.Black}`,
  marginBottom: "0.2rem",
});

const Label = styled.label({
  display: "block",
  marginBottom: "0.2rem",
});

type FormGroupProps = {
  hasDate: boolean;
};

const InputBase = styled.input<FormGroupProps>(({ hasDate }) => ({
  border: `1px solid ${colors.Black}`,
  borderRadius: 0,
  fontSize: "1.2em",
  padding: "0",
  paddingLeft: "0.2rem",
  lineHeight: "1.5rem",
  width: "100%",
  fontWeight: fontWeight.regular,
  color: hasDate ? colors.Black : colors.FrenchGrey,

  ":focus": {
    outline: `2px solid ${colors.DenimBlue}`,
  },

  "::placeholder": {
    color: colors.FrenchGrey,
    opacity: 1,
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
