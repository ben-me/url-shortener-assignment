import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BurgerMenu from "./BurgerMenu";
import DiamondIcon from "@mui/icons-material/Diamond";
import styled from "styled-components";
import LanguageSelector from "./LanguageSelector";

export default function NavBar() {
  return (
    <NavigationBar>
      <LeftItems>
        <BurgerMenu />
        <DiamondIcon sx={{ fontSize: 35 }} />
      </LeftItems>
      <RightItems>
        <LanguageSelector />
        <AccountBoxIcon sx={{ fontSize: 50 }} />
      </RightItems>
    </NavigationBar>
  );
}

const NavigationBar = styled.nav`
  width: 100vw;
  height: 3.5rem;
  padding-right: 1.5rem;
  position: fixed;
  top: 0;
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

const RightItems = styled(LeftItems)`
  gap: 0.5rem;
`;
