import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { colors } from "../theme/colors";
import { Option } from "../../types";
import { GrStatusWarning } from "react-icons/gr";

type Props<T extends Option> = {
  label: string;
  options: Array<Option>;
  errors?: string;
  value?: string;
  placeholder?: string;
  onChange: (value: T["name"]) => void;
};

const Dropdown = React.forwardRef(
  <T extends Option>(
    {
      label,
      options,
      value,
      errors,
      placeholder = "Select",
      onChange,
    }: Props<T>,
    ref: React.ForwardedRef<HTMLUListElement>
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [option, setOption] = useState<Option>();
    const [hasOption, setHasOption] = useState<boolean>(false);

    useEffect(() => {
      if (value !== "" && options.length > 0) {
        options.forEach((o) => {
          if (o.id === value) {
            setOption(o);
            setHasOption(true);
          }
        });
      }
    }, [value, options]);

    return (
      <Container>
        <FormGroup>
          <label>{label}:</label>
          <Input
            onClick={() => setIsOpen(!isOpen)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (["Enter"].includes(e.key)) {
                if (e.key === "Enter") {
                  setIsOpen(!isOpen);
                }
              }
            }}
            onBlur={() => setIsOpen(false)}
          >
            <Content hasOption={hasOption}>
              {option?.name ?? placeholder}
            </Content>
          </Input>
        </FormGroup>

        {isOpen && (
          <OptionsList>
            {options.length > 0 ? (
              options.map((o) => (
                <OptionList
                  key={o.id}
                  onMouseDown={() => {
                    onChange(o.id);
                    setOption(o);
                    setHasOption(true);
                    setIsOpen(false);
                  }}
                  {...ref}
                >
                  {o.name}
                </OptionList>
              ))
            ) : (
              <OptionList>No Options</OptionList>
            )}
          </OptionsList>
        )}
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

const Container = styled.div({
  marginBottom: "1rem",
  position: "relative",
  width: "100%",
});

const FormGroup = styled.div({
  borderBottom: `2px solid ${colors.Black}`,
  marginBottom: "0.2rem",

  "& label": {
    display: "block",
    marginBottom: "0.2rem",
  },
});

const Input = styled.div({
  border: `1px solid ${colors.Gunmetal}`,
  padding: "0.2rem 0.4rem",
  width: "100%",
  outline: 0,

  "&:focus": {
    outline: `2px solid ${colors.DenimBlue}`,
  },
});

type ContentProps = {
  hasOption: boolean;
};

const Content = styled.span<ContentProps>(({ hasOption }) => ({
  fontSize: "1.2em",
  width: "100%",
  color: hasOption ? colors.Black : colors.FrenchGrey,
  lineHeight: "1.5rem",
}));

const OptionsList = styled.ul({
  backgroundColor: colors.White,
  borderLeft: `1px solid ${colors.DoveGrey}`,
  borderRight: `1px solid ${colors.DoveGrey}`,
  borderBottom: `1px solid ${colors.DoveGrey}`,
  width: "100%",
  maxHeight: "200px",
  overflowY: "scroll",
  position: "absolute",
  zIndex: 1,
});

const OptionList = styled.li({
  cursor: "pointer",
  padding: "0.4rem",
  width: "100%",

  "&:hover": {
    backgroundColor: colors.Mercury,
  },
});

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

export default Dropdown;
