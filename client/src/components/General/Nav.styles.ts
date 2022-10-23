import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavBar = styled.div`
  width: 100%;
  height: 64px;
  background: #f7f7f7;
  border-bottom: 1px solid #555;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 8px;
`;

export const LogoContainer = styled.div`
  margin-left: 80px;
  font-weight: 500;
  cursor: pointer;
`;

export const LinksContainer = styled.div`
  margin-right: 20px;
  display: flex;
  width: 300px;
  justify-content: space-evenly;
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgb(14, 34, 14);
  &:hover {
    color: rgba(14, 34, 14, 0.8);
  }
`;
