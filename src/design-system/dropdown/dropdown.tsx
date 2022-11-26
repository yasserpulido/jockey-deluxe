import styled from "@emotion/styled";
import { useState } from "react";
import { colors } from "../theme/colors";

type Option = {
  id: string;
  name: string;
};

type Props<T extends Option> = {
  text: string;
  options: Array<T>;
  onChange: () => {};
};

const Dropdown = <T extends Option>({ text, options, onChange }: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!options) {
    return <p>Error</p>;
  }

  return (
    <FormGroup>
      <TEST_DIV onClick={() => setIsOpen(!isOpen)}>{text}</TEST_DIV>
      <TEST_UL isOpen={isOpen}>
        {isOpen && options.map((o) => <li key={o.id}>{o.name}</li>)}
      </TEST_UL>
    </FormGroup>
  );
};

type ListProps = {
  isOpen: boolean;
};

const TEST_UL = styled.ul<ListProps>(({ isOpen }) => ({
  backgroundColor: "red",
}));

const TEST_DIV = styled.div({
  width: "100%",
  backgroundColor: colors.BlueDress,
  border: "none",
  color: colors.White,
  cursor: "pointer",
  fontSize: "1rem",
  padding: "0.5rem 2rem",
  outline: 0,
  textAlign: "center",
});

const FormGroup = styled.div({
  marginBottom: "1.4rem",

  "& label": {
    display: "block",
    marginBottom: "0.4rem",
  },

  "& option": {
    borderRadius: 0,
    border: `1px solid ${colors.Gunmetal}`,
    fontSize: "1rem",
    padding: "0.7rem 0.5rem",
    outline: 0,
    width: "100%",
  },
});

export default Dropdown;
