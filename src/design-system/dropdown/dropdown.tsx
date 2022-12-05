import React, { useEffect, useRef, useState } from "react";
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

const Dropdown = React.forwardRef<HTMLUListElement, Props<Option>>(
  (
    { label, options, value, errors, placeholder = "Select", onChange },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [option, setOption] = useState<Option | null>(null);
    const [hasOption, setHasOption] = useState<boolean>(false);
    const [cursor, setCursor] = useState<number | null>(null);
    const test = useRef<any>(null);

    // Si se abre el dropdown, asiga el primero o la opcion seleccionada.
    useEffect(() => {
      if (isOpen && options.length > 0 && option === null) {
        setOption(options[0]);
        setCursor(0);
        setHasOption(true);
      }
    }, [isOpen, options, option]);

    // Si viene valor desde value y existe en la lista se asigna esa opcion.
    useEffect(() => {
      if (value !== "" && options.length > 0) {
        options.forEach((o, index) => {
          if (o.id === value) {
            setOption(o);
            setCursor(index);
            setHasOption(true);
          }
        });
      }
    }, [value, options]);

    useEffect(() => {
      if (cursor !== null) {
        setOption(options[cursor]);
        setHasOption(true);
      }
    }, [options, cursor]);

    const handleKey = (e: any) => {
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
            scrollHandler();
          }
          break;
        case "ArrowDown":
          if (isOpen) {
            setCursor((prevState) => {
              return prevState !== null && prevState < options.length - 1
                ? prevState + 1
                : prevState;
            });
            scrollHandler();
          }
          break;
      }
    };

    const scrollHandler = () => {
      const listbox = document.getElementById("options-list");
      const selectedOption = document.getElementById(`${option?.id}-option`);

      if (
        selectedOption &&
        listbox !== null &&
        listbox.scrollHeight > listbox.clientHeight
      ) {
        const scrollBottom = listbox.clientHeight + listbox.scrollTop;
        const elementBottom =
          selectedOption.offsetTop + selectedOption.offsetHeight;
        if (elementBottom >= scrollBottom) {
          listbox.scrollTop = elementBottom - listbox.clientHeight;
        } else if (selectedOption.offsetTop < listbox.scrollTop) {
          listbox.scrollTop = selectedOption.offsetTop;
        }
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
            <Content hasOption={hasOption}>
              {option?.name ?? placeholder}
            </Content>
          </Input>
        </FormGroup>

        {isOpen && (
          <OptionsList id="options-list" ref={test}>
            {options.length > 0 ? (
              options.map((o, index) => (
                <OptionList
                  id={`${o.id}-option`}
                  key={o.id}
                  onMouseDown={() => {
                    onChange(o.id);
                    setOption(o);
                    setHasOption(true);
                    setIsOpen(false);
                    setCursor(index);
                  }}
                  active={option?.id === o.id}
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
  }
);

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
  top: "49px",
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
