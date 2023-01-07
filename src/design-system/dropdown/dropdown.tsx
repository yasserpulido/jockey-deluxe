import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { GrStatusWarning } from "react-icons/gr";
import { colors, fontWeight } from "../theme";
import { Option } from "../../types";

type Props<T extends Option> = {
  label: string;
  options: Array<Option>;
  errors?: string;
  value?: string;
  placeholder?: string;
  onChange: (value: T["id"]) => void;
};

const Dropdown = ({
  label,
  options,
  value,
  errors,
  placeholder = "Select",
  onChange,
}: Props<Option>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [option, setOption] = useState<Option | null>(null);
  const [hasOption, setHasOption] = useState<boolean>(false);
  const [cursor, setCursor] = useState<number | null>(null);
  const optionBox = useRef<HTMLUListElement>(null);
  const optionSelected = useRef<Array<HTMLLIElement>>([]);

  // Si se abre el dropdown, asiga el primero si no hay opcion previamente seleccionado.
  useEffect(() => {
    if (isOpen && options.length > 0 && option === null) {
      setOption(options[0]);
      setCursor(0);
      setHasOption(true);
    }
  }, [isOpen, options, option]);

  // Si viene valor desde props.value y existe en la lista se asigna esa opcion.
  useEffect(() => {
    if (value !== "" && options.length > 0) {
      options.forEach((o, index) => {
        if (o.id === value) {
          setOption(o);
          setCursor(index);
          setHasOption(true);
        }
      });
    } else {
      setOption(null);
      setCursor(null);
      setHasOption(false);
    }
  }, [value, options]);

  // Al setearse el cursor, se actualiza la option.
  useEffect(() => {
    if (cursor !== null) {
      setOption(options[cursor]);
      setHasOption(true);
    }
  }, [options, cursor]);

  // Verifica el comportamiento del scrollbar
  useEffect(() => {
    if (
      cursor !== null &&
      isOpen &&
      optionSelected !== null &&
      optionSelected.current !== null &&
      optionBox !== null &&
      optionBox.current !== null &&
      optionBox.current.scrollHeight > optionBox.current.clientHeight
    ) {
      const scrollBottom =
        optionBox.current.clientHeight + optionBox.current.scrollTop;
      const elementBottom =
        optionSelected.current[cursor].offsetTop +
        optionSelected.current[cursor].offsetHeight;

      if (elementBottom > scrollBottom) {
        optionBox.current.scrollTop =
          elementBottom - optionBox.current.clientHeight;
      } else if (
        optionSelected.current[cursor].offsetTop < optionBox.current.scrollTop
      ) {
        optionBox.current.scrollTop = optionSelected.current[cursor].offsetTop;
      }
    }
  }, [cursor, isOpen]);

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "Enter":
        setIsOpen(!isOpen);
        break;
      case "ArrowUp":
        if (isOpen) {
          setCursor((prevState) => {
            return prevState !== null && prevState > 0
              ? prevState - 1
              : prevState;
          });
        }
        break;
      case "ArrowDown":
        if (isOpen) {
          setCursor((prevState) => {
            return prevState !== null && prevState < options.length - 1
              ? prevState + 1
              : prevState;
          });
        } else {
          setIsOpen(true);
        }
        break;
    }
  };

  return (
    <Container>
      <FormGroup>
        <label>{label}:</label>
        <Input
          onClick={() => setIsOpen(!isOpen)}
          tabIndex={0}
          onKeyDown={(e) => {
            handleKey(e);
          }}
          onBlur={() => setIsOpen(false)}
        >
          <Content hasOption={hasOption}>{option?.name ?? placeholder}</Content>
        </Input>
      </FormGroup>
      {isOpen && (
        <OptionsList ref={optionBox}>
          {options.length > 0 ? (
            options.map((o, index) => (
              <OptionList
                key={o.id}
                onMouseDown={() => {
                  onChange(o.id);
                  setOption(o);
                  setHasOption(true);
                  setIsOpen(false);
                  setCursor(index);
                }}
                active={option?.id === o.id}
                ref={(element) => {
                  if (element !== null) {
                    optionSelected.current[index] = element;
                  }
                }}
              >
                {o.name}
              </OptionList>
            ))
          ) : (
            <OptionList active={hasOption}>No Options</OptionList>
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
};

const Container = styled.div({
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
  padding: "0",
  paddingLeft: "0.2rem",
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
  fontWeight: fontWeight.regular,
}));

const OptionsList = styled.ul({
  backgroundColor: colors.White,
  border: `1px solid ${colors.DoveGrey}`,
  width: "100%",
  maxHeight: "200px",
  overflowY: "scroll",
  position: "absolute",
  top: "42px",
  zIndex: 1,
});

type OptionListProps = {
  active: boolean;
};

const OptionList = styled.li<OptionListProps>(({ active }) => ({
  cursor: "pointer",
  padding: "0.4rem",
  width: "100%",
  backgroundColor: active ? colors.Mercury : "none",

  "&:hover": {
    backgroundColor: colors.Mercury,
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

export default Dropdown;
