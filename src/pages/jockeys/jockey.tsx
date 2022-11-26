import styled from "@emotion/styled";
import React from "react";
import { colors } from "../../design-system/theme/colors";
import Detail from "./components/detail";
import List from "./components/list";

const Jockeys = () => {
  return (
    <React.Fragment>
      <Detail />
      <List />
    </React.Fragment>
  );
};

export default Jockeys;
