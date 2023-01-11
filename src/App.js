import styled from "styled-components";
import { Button } from "@mui/material";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import useInput from "./components/inputHook";
import { useState } from "react";
import NavigationBar from "../src/components/NavBar";

function App() {
  const [urlValue, setURLValue] = useInput("");
  const [shortURLValue, setShortURLValue] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const newURL = { url: urlValue, ttlInSeconds: 600 };

    await fetch("https://urlshortener.smef.io/urls", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newURL),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setShortURLValue(`https://urlshortener.smef.io/${data.id}`);
      });
  }

  return (
    <>
      <NavigationBar />
      <StyledMain>
        <StyledForm type="submit" onSubmit={handleSubmit}>
          {setURLValue}
          <StyledMaterialButton variant="contained" size="small" type="submit">
            Go!
          </StyledMaterialButton>
        </StyledForm>
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

const StyledMain = styled.main`
  position: fixed;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 3rem;
  left: 50%;
  top: 50%;
  transform: translateY(-150%) translateX(-50%);
`;

const StyledForm = styled.form`
  position: relative;
  display: flex;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 20rem;
`;

const StyledMaterialButton = styled(Button)`
  && {
    position: absolute;
    margin: 0 1rem;
    padding: 0 1rem;
    right: -6rem;
  }
`;

const Arrow = styled(ArrowDownwardOutlinedIcon)`
  && {
    justify-self: center;
    grid-column: span 3;
  }
`;
