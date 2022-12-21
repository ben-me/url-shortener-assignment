import { useState } from "react";

export default function useInput() {
  const [inputValue, setInputValue] = useState("");
  const input = (
    <input
      type="url"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
  return [inputValue, input];
}
