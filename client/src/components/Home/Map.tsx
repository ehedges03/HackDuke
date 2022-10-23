import { useEffect, useMemo, useRef, useState } from "react";

import { MapContainer } from "./Map.styles";
import { Wrapper } from "@googlemaps/react-wrapper";

const Points = {};

export default function Map() {
  const [center, setCenter] = useState({ lat: 37, lng: -96 });
  const ref = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (ref?.current != null && map.current == null) {
      map.current = new window.google.maps.Map(ref.current, {
        center,
        zoom: 10,
      });

      // Get bounds gives north east and south west corners of the map
      // Convert to north west and south east and pass to api with filters to get all points in bound
      // Calculate degree to pixel ratio and use to print out circles onto
      // canvas
      // Whenever movement occurs redraw canvas points until new data comes in and then draw that
      // instead of the old data
      map.current.addListener("recenter", () => {
        map.current!.getBounds();
      });
      // setInterval(() => {
      //   console.log(map.getBounds());
      // }, 1000);
    }
  });

  return <MapContainer ref={ref} id="map" />;
}
