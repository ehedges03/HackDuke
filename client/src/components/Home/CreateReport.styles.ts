import styled from "styled-components";

import { OPEN_CLOSE_ANIMATE_TIME } from "./CreateReport";

export const CreateReportContainer = styled.div`
  position: absolute;
  bottom: calc((5vh+5vw) / 2);
  right: calc((5vh+5vw) / 2);
  height: calc((25vh+25vw) / 2);
  width: calc((25vh+25vw) / 2);
  border-radius: 50%;
  background-color: #afa6da;
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
                box-sizing: border-box;
            `
      : `                
            `}
`;
