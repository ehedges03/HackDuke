import styled from "styled-components";

export const SearchBarContainer = styled.div`
  z-index: 10;
  text-align: left;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  grid-column-start: 1;
  grid-column-end: span 6;
  grid-row-start: 6;
  grid-row-end: span 1;
`;

export const StyledCombobox = styled.input`
  box-sizing: border-box;
  padding: 0.5rem;
  font-size: 12pt;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  border-radius: 8px;
  border-width: 1px;
`;
