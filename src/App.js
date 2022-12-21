import styled from "styled-components";
import "./App.css";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BurgerMenu from "./components/BurgerMenu";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Button } from "@mui/material";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import useInput from "./components/inputHook";
import { useState } from "react";

function App() {
  const [urlValue, setURLValue] = useInput("");
  const [shortURLValue, setShortURLValue] = useState("");

  async function handleClick() {
    const newURL = { url: urlValue, ttlInSeconds: 60 };

    await fetch("https://urlshortener.smef.io/urls", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newURL),
    })
      .then((response) => response.json())
      .then((data) => {
        setShortURLValue(`https://urlshortener.smef.io/${data.id}`);
      });
  }

  return (
    <>
      <NavBar>
        <LeftItems>
          <BurgerMenu />
          <DiamondIcon sx={{ fontSize: 35 }} />
        </LeftItems>
        <AccountBoxIcon sx={{ fontSize: 50 }} />
      </NavBar>
      <StyledMain>
        {setURLValue}
        <StyledMaterialButton
          variant="contained"
          size="small"
          onClick={handleClick}
          type="submit"
        >
          Go!
        </StyledMaterialButton>
        <Arrow sx={{ fontSize: 70 }} />
        <StyledInput
          name="smallURL"
          readOnly
          type="text"
          value={shortURLValue}
        />
      </StyledMain>
    </>
  );
}

export default App;

const NavBar = styled.nav`
  width: 100vw;
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: gray;
`;

const LeftItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledMain = styled.main`
  position: fixed;
  display: grid;
  grid-template-columns: 1fr 1rem;
  row-gap: 3rem;
  left: 50%;
  top: 50%;
  transform: translateY(-200%) translateX(-50%);
`;

const StyledInput = styled.input`
  width: 20rem;
`;

const StyledMaterialButton = styled(Button)`
  && {
    margin: 0 1rem;
    padding: 0 1rem;
  }
`;

const Arrow = styled(ArrowDownwardOutlinedIcon)`
  && {
    justify-self: center;
    grid-column: span 2;
  }
`;
