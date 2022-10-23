import { useMemo } from "react";
import Autocomplete from "react-google-autocomplete";
import { SearchBarContainer } from "./SearchBar.styles";

export default function SearchBar() {
  const containerStyle = useMemo(() => {
    return {
      width: "500px",
      height: "50px",
      marginLeft: "500px",
      borderRadius: "15px",
      marginTop: "20px",
    };
  }, []);
  return (
    <>
      <SearchBarContainer>
        <Autocomplete
          style={containerStyle}
          apiKey={process.env.REACT_APP_API_KEY!}
          onPlaceSelected={(place) => {
            console.log(place);
          }}
        />
      </SearchBarContainer>
    </>
  );
}
