import { useState } from "react";
import styled from "styled-components";
import { slide as Menu } from "react-burger-menu";
import MenuIcon from "@mui/icons-material/Menu";
import { Text } from "./LanguageContext";

export default function BurgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <BurgerMenuStyles>
      <Menu
        customBurgerIcon={<MenuIcon />}
        width={"15%"}
        left
        isOpen={isMenuOpen}
        onStateChange={(state) => setIsMenuOpen(state.isOpen)}
      >
        <Link href="/">
          <Text tid="homePage" />
        </Link>
        <Link href="/admin">
          <Text tid="adminPage" />
        </Link>
      </Menu>
    </BurgerMenuStyles>
  );
}

const BurgerMenuStyles = styled.div`
  .bm-burger-button {
    position: relative;
    width: 2.6rem;
    height: 3.5rem;
    left: 0.32rem;
    top: 0;
    background-color: transparent;
  }

  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: #373a47;
  }

  /* Color/shape of burger icon bars on hover*/
  .bm-burger-bars-hover {
    background: #a90000;
  }

  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  /* Color/shape of close button cross */
  .bm-cross {
    background: #bdc3c7;
  }

  /*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
  .bm-menu-wrap {
    position: fixed;
    height: 100%;
    top: 0;
  }

  /* General sidebar styles */
  .bm-menu {
    background: #373a47;
    padding: 2.5em 1em 0;
    font-size: 1.15em;
  }

  /* Wrapper for item list */
  .bm-item-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-size: 1.3rem;
    text-align: center;
    color: #b8b7ad;
    padding: 0.3em;
  }

  /* Individual item */
  .bm-item {
    display: inline-block;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: #4c474f;
  }
`;

const Link = styled.a`
  text-decoration: none;
`;
