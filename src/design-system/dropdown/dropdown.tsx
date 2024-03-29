import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { colors, fontWeight } from "../theme";
import { Option } from "../../types";
import { Alert, FormDown } from "grommet-icons";

type Props<T extends Option> = {
  label: string;
  name: string;
  options: Array<Option>;
  errors?: string;
  value?: string;
  placeholder?: string;
  onChange: (value: T["id"]) => void;
};

const Dropdown = React.forwardRef(
  (
    {
      label,
      name,
      options,
      value,
      errors,
      placeholder = "Select",
      onChange,
    }: Props<Option>,
    ref
  ) => {
    const [optionIndex, setOptionIndex] = useState<string | undefined>(value);
    const [option, setOption] = useState<Option | null>(null);
    const [optionList, setOptionsList] = useState<Array<Option>>(options);
    const [isListOpen, setIsListOpen] = useState<boolean>(false);
    const [cursorList, setCursorList] = useState<number | null>(null);
    const [hasOptionList, setHasOptionList] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>("");
    const optionBoxRef = useRef<HTMLUListElement>(null);
    const optionSelectedRef = useRef<Array<HTMLLIElement>>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setOptionsList(options);
    }, [options]);

    // If the list is opened and there is no option selected, the first option of the list is selected.
    useEffect(() => {
      if (isListOpen && optionList.length > 0 && option === null) {
        setOption(optionList[0]);
        setCursorList(0);
        setHasOptionList(true);
      }
    }, [isListOpen, optionList, option]);

    useEffect(() => {
      if (optionIndex !== "" && optionList.length > 0) {
        optionList.forEach((o, index) => {
          if (o.id === optionIndex) {
            setOption(o);
            setCursorList(index);
            setHasOptionList(true);
          }
        });
      } else {
        setOption(null);
        setCursorList(null);
        setHasOptionList(false);
      }
    }, [optionIndex, optionList]);

    useEffect(() => {
      if (cursorList !== null) {
        setOption(optionList[cursorList]);
        setHasOptionList(true);
      }
    }, [optionList, cursorList]);

    useEffect(() => {
      if (
        cursorList !== null &&
        isListOpen &&
        optionSelectedRef !== null &&
        optionSelectedRef.current !== null &&
        optionBoxRef !== null &&
        optionBoxRef.current !== null &&
        optionBoxRef.current.scrollHeight > optionBoxRef.current.clientHeight
      ) {
        const scrollBottom =
          optionBoxRef.current.clientHeight + optionBoxRef.current.scrollTop;
        const elementBottom =
          optionSelectedRef.current[cursorList].offsetTop +
          optionSelectedRef.current[cursorList].offsetHeight;

        if (elementBottom > scrollBottom) {
          optionBoxRef.current.scrollTop =
            elementBottom - optionBoxRef.current.clientHeight;
        } else if (
          optionSelectedRef.current[cursorList].offsetTop <
          optionBoxRef.current.scrollTop
        ) {
          optionBoxRef.current.scrollTop =
            optionSelectedRef.current[cursorList].offsetTop;
        }
      }
    }, [cursorList, isListOpen]);

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Enter":
          if (option !== null) {
            onChange(option.id);
            setInputText(option.name);
            setHasOptionList(true);
          }
          setIsListOpen(!isListOpen);
          break;
        case "ArrowUp":
          if (isListOpen) {
            setCursorList((prevState) => {
              return prevState !== null && prevState > 0
                ? prevState - 1
                : prevState;
            });
          }
          break;
        case "ArrowDown":
          if (isListOpen) {
            setCursorList((prevState) => {
              return prevState !== null && prevState < optionList.length - 1
                ? prevState + 1
                : prevState;
            });
          } else {
            setIsListOpen(true);
          }
          break;
      }
    };

    const handleFilter = (value: string) => {
      const filtered = options.filter((o) => {
        return o.name.toLowerCase().includes(value.toLowerCase());
      });

      if (filtered.length > 0) {
        setOptionIndex(filtered[0].id);
        setOption(filtered[0]);
        setOptionsList(filtered);
      }
    };

    return (
      <Container>
        <FormGroup>
          <Label htmlFor={name}>{label}:</Label>
          <Input
            id={name}
            name={name}
            placeholder={placeholder}
            type="text"
            tabIndex={0}
            onKeyDown={(e) => {
              handleKey(e);
            }}
            onBlur={() => {
              setIsListOpen(false);
              if (option !== null) {
                setInputText(option.name);
              }
            }}
            onChange={(e) => {
              setIsListOpen(true);
              setInputText(e.target.value);
              handleFilter(e.target.value);
            }}
            onFocus={() => setIsListOpen(true)}
            value={inputText}
            ref={inputRef}
          />
          <IconContainer
            onClick={() => {
              inputRef.current?.focus();
            }}
          >
            <FormDown />
          </IconContainer>
        </FormGroup>
        {isListOpen && (
          <OptionsList ref={optionBoxRef} hasOptionList={hasOptionList}>
            {optionList.length > 0 ? (
              optionList.map((o, index) => (
                <OptionList
                  key={o.id}
                  onMouseDown={() => {
                    onChange(o.id);
                    setOption(o);
                    setInputText(o.name);
                    setHasOptionList(true);
                    setIsListOpen(false);
                    setCursorList(index);
                  }}
                  active={option?.id === o.id}
                  ref={(element) => {
                    if (element !== null) {
                      optionSelectedRef.current[index] = element;
                    }
                  }}
                >
                  {o.name}
                </OptionList>
              ))
            ) : (
              <OptionList active={hasOptionList}>No Options</OptionList>
            )}
          </OptionsList>
        )}
        {errors && (
          <Error>
            <Alert size="small" />
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
  position: "relative",
});

const Label = styled.label({
  display: "block",
  marginBottom: "0.2rem",
});

const Input = styled.input({
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
});

const IconContainer = styled.div({
  position: "absolute",
  top: "70%",
  transform: "translateY(-50%)",
  right: 0,
  cursor: "pointer",
  zIndex: 1,
});

type OptionsListProps = {
  hasOptionList?: boolean;
};

const OptionsList = styled.ul<OptionsListProps>(
  ({ hasOptionList = false }) => ({
    backgroundColor: colors.White,
    border: `1px solid ${colors.DoveGrey}`,
    width: "100%",
    maxHeight: "200px",
    overflowY: hasOptionList ? "scroll" : "hidden",
    position: "absolute",
    top: "42px",
    zIndex: 1,
    minHeight: "36px",
  })
);

type OptionListProps = {
  active: boolean;
};

const OptionList = styled.li<OptionListProps>(({ active }) => ({
  cursor: "pointer",
  padding: "0.7rem",
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
    marginRight: "0.4rem",
    stroke: colors.PersianRed,
  },
});

export default Dropdown;
