import { useEffect, useState } from "react";
import {
  CreateReportContainer,
  CreateIconStyled,
  XIconStyled,
  CreateReportHeader,
} from "./CreateReport.styles";

export const OPEN_CLOSE_ANIMATE_TIME = 0.2;

export default function CreateReport() {
  const [display, setDisplay] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (animate) {
      setTimeout(() => setAnimate(false), OPEN_CLOSE_ANIMATE_TIME * 1000);
    }
  }, [animate]);

  return (
    <CreateReportContainer
      title={display ? "" : "Create Report"}
      onClick={() => {
        if (!display) {
          setDisplay(true);
          setAnimate(true);
        }
      }}
      display={display ? true : false}
      animate={animate ? true : false}
    >
      {display ? (
        animate ? null : (
          <Options setDisplay={setDisplay} setAnimate={setAnimate} />
        )
      ) : animate ? null : (
        <CreateIconStyled />
      )}
    </CreateReportContainer>
  );
}

function Options({
  setDisplay,
  setAnimate,
}: {
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <XIconStyled
        onClick={() => {
          setDisplay(false);
          setAnimate(true);
        }}
      />
      <CreateReportHeader> CREATE SYMPTOM REPORT </CreateReportHeader>

      {/* add google autocomplete, and the chipsautocomplete components that are in comp folder */}
    </>
  );

  async function createNewReport() {
    // code to write to db
    setDisplay(false);
  }
}
