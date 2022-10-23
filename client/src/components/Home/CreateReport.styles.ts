import styled from "styled-components";

import { OPEN_CLOSE_ANIMATE_TIME } from "./CreateReport";
import { ReactComponent as CreateIcon } from "./create.svg";
import { ReactComponent as XIcon } from "./XIcon.svg";

export const CreateReportContainer = styled.div<{
  display: boolean;
  animate: boolean;
}>`
  position: absolute;
  bottom: calc((5vh+5vw) / 2);
  right: calc((5vh+5vw) / 2);
  height: calc((25vh+25vw) / 2);
  width: calc((25vh+25vw) / 2);
  border-radius: 3vh;
  background-color: #a51c30;
  color: white;
  cursor: ${(props) => (props.display ? "auto" : "pointer")};
  z-index: 1000;
  overflow: hidden;
  transition: ${(props) =>
    props.animate ? `all ${OPEN_CLOSE_ANIMATE_TIME}s ease-out` : "none"};
  display: grid;
  grid-template-columns: repeat(10, calc((100% - (1% * 10)) / 10));
  grid-template-rows: repeat(10, calc((100% - (1% * 10)) / 10));
  gap: 1%;

  ${(props) =>
    props.display
      ? `
                width: 75%;
                height: 75%;
                right: 12.5%;
                bottom: 12.5%;
                border-radius: 5vh;
                padding: 2.5vh;
                box-sizing: border-box ;
            `
      : `                
            `}
`;

export const CreateIconStyled = styled(CreateIcon)`
  position: absolute;
  top: 25%;
  right: 25%;
  width: 50%;
  height: 50%;
  filter: invert(100%) sepia(0%) saturate(7479%) hue-rotate(70deg)
    brightness(99%) contrast(107%);
`;

export const XIconStyled = styled(XIcon)`
  cursor: pointer;
  display: block;
  margin: auto;
  width: 100%;
  height: 100%;
  grid-column: 10 / span 1;
  grid-row: 1 / span 1;
`;

export const CreateReportHeader = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 40pt;
  grid-column-start: 4;
  grid-column-end: span 6;
`;
