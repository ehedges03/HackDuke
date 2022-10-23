import { Wrapper } from "@googlemaps/react-wrapper";
import { useLoadScript } from "@react-google-maps/api";
import CreateReport from "components/Home/CreateReport";
import Map from "components/Home/Map";
import SearchBar from "components/Home/SearchBar";
import { useState, useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (process.env.REACT_APP_API_KEY == null) {
      throw new Error("API key not found");
    }
  });
  return (
    <>
      <Wrapper apiKey={process.env.REACT_APP_API_KEY!}>
        {/* <Map /> */}
        <SearchBar />
      </Wrapper>
      <CreateReport />
    </>
  );
}
