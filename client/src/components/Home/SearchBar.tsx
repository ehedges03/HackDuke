import { useRef, useEffect } from "react";
import { StyledCombobox } from "./SearchBar.styles";

export default function SearchBar() {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref?.current != null) {
      // TODO: ROB!!!! ------>> https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete
      // new window.google.maps.places.Autocomplete(ref.current, {
      //   // fields: ["formatted_address", "geometry", "name"],
      //   // strictBounds: false,
      //   // types: ["establishment"],
      // });
      // setInterval(() => {
      //   console.log(map.getBounds());
      // }, 1000);
    }
  });

  return <StyledCombobox ref={ref} />;
}
