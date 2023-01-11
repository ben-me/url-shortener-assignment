import React, { useContext } from "react";
import styled from "styled-components";
import { LanguageContext } from "./LanguageContext";

export default function LanguageSelector() {
  const { userLanguage, userLanguageChange } = useContext(LanguageContext);

  const handleClick = (e) => {
    userLanguageChange(e.target.value);
  };

  return (
    <>
      <LanguageButton id="de" value="de" onClick={handleClick}>
        DE
      </LanguageButton>
      <LanguageButton id="en" value="en" onClick={handleClick}>
        EN
      </LanguageButton>
    </>
  );
}

const LanguageButton = styled.button`
  border: none;
  padding: 0.5rem;
  background: none;
  color: black;
  cursor: pointer;
`;
