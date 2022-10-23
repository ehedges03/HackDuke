import { useLoadScript } from "@react-google-maps/api";
import Map from "components/Home/Map";
import SearchBar from "components/Home/SearchBar";
import { useState } from "react";

export default function Home() {
  return (
    <>
      <Map />
      {/* <SearchBar /> */}
    </>
  );
}
