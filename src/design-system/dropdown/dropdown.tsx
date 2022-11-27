import styled from "@emotion/styled";
import { useState } from "react";
import { colors } from "../theme/colors";

type Option = {
  id: string;
  name: string;
};

type Props<T extends Option> = {
  label: string;
  options: Array<T>;
  onChange: (value: any) => void;
};

const Dropdown = <T extends Option>({ label, options, onChange }: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState<T | null>(null);

  onChange(1);

  return (
    <Container>
      <label>{label}:</label>
      <input
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        placeholder="Select"
        value={option?.name}
      />
      {isOpen && (
        <TEST_UL>
          {options.length > 0 ? (
            options.map((o) => (
              <TEST_LI
                key={o.id}
                onMouseDown={() => setOption(o)}
                onChange={() => onChange(o.id)}
              >
                {o.name}
              </TEST_LI>
            ))
          ) : (
            <TEST_LI>No options</TEST_LI>
          )}
        </TEST_UL>
      )}
    </Container>
  );
};

const Container = styled.div({
  marginBottom: "1.4rem",
  width: "100%",
  position: "relative",

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
  },
});

const TEST_UL = styled.ul({
  backgroundColor: colors.White,
  borderLeft: `1px solid ${colors.DoveGrey}`,
  borderRight: `1px solid ${colors.DoveGrey}`,
  borderBottom: `1px solid ${colors.DoveGrey}`,
  width: "100%",
  maxHeight: "200px",
  overflowY: "scroll",
  position: "absolute",
});

const TEST_LI = styled.li({
  cursor: "pointer",
  padding: "0.25rem 1.5rem",
  width: "100%",

  "&:hover": {
    backgroundColor: colors.Mercury,
  },
});

export default Dropdown;
