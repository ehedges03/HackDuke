import { useEffect, useState } from "react";
import { CreateReportContainer } from "./CreateReport.styles";

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
        setDisplay(true);
        setAnimate(true);
      }}
      display={display ? 1 : 0}
      animate={animate ? 1 : 0}
    >
      {display ? (
        animate ? null : (
          <Options setDisplay={setDisplay} setAnimate={setAnimate} />
        )
      ) : animate ? null : (
        <h1>Cr</h1>
      )}
    </CreateReportContainer>
  );
}

function Options({ setDisplay, setAnimate }) {
  return (
    <>
      <h1
        onClick={() => {
          setDisplay(false);
          setAnimate(true);
        }}
      >
        help
      </h1>
    </>
  );
  async function createNewReport() {
    setDisplay(false);
  }
}
