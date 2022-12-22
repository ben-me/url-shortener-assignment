import { useState } from "react";
import styled from "styled-components";

export default function useInput() {
  const [inputValue, setInputValue] = useState("");
  const input = (
    <StyledHook
      type="url"
      value={inputValue}
      pattern="https://.*"
      required
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
  return [inputValue, input];
}

const StyledHook = styled.input`
  width: 20rem;
`;
