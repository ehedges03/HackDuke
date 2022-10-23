import React from "react";
import {
  LinksContainer,
  NavBar,
  StyledLink,
  LogoContainer,
} from "./Nav.styles";

const data = require("./links.json");
//const linksString = JSON.stringify(data);
//const links = JSON.parse(linksString).links;

type Link = {
  label: string;
  href: string;
};

const Links: React.FC<{ links: Link[] }> = ({ links }) => {
  return (
    <LinksContainer>
      {links.map((link: Link) => {
        return <StyledLink to={link.href}>{link.label}</StyledLink>;
      })}
    </LinksContainer>
  );
};

const Nav: React.FC<{}> = () => {
  return (
    <NavBar>
      <LogoContainer>
        <span>Logo</span>
      </LogoContainer>
      <Links links={data.links} />
    </NavBar>
  );
};

export default Nav;
