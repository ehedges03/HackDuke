import { useEffect, useState } from "react";
import {
  CreateReportContainer,
  CreateIconStyled,
  XIconStyled,
  CreateReportHeader,
} from "./CreateReport.styles";

import { FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import { withTheme } from "styled-components";
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

const buttonStyle = {
  top: "250px",
  color: "white",
  left: "500px",
  fontSize: "15pt",
  padding: "25px",
};

const h2style = {
  marginTop: "100px",
};

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

      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Fever" />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Chills"
        />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Cough" />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Nausea"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Fatigue"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Headache"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Sore Throat"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Congestion"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Difficulty Breathing"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Body Aches"
        />
      </FormGroup>

      <h2 style={h2style}>
        {" "}
        Your Current Location is: &#123; 36.003488012751355, -78.93994010395218
        &#123;{" "}
      </h2>

      <Button
        variant="contained"
        onClick={() => {
          setDisplay(false);
          setAnimate(true);
        }}
        style={buttonStyle}
      >
        Submit
      </Button>

      {/* add google autocomplete, and the chipsautocomplete components that are in comp folder */}
    </>
  );

  async function createNewReport() {
    // code to write to db
    setDisplay(false);
  }
}
