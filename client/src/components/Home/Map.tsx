import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useEffect, useMemo, useRef, useState } from "react";

import { MapContainer } from "./Map.styles";

export default function Map() {
  const [center, setCenter] = useState({ lat: 37, lng: -96 });
  useEffect(() => {
    let watcher = navigator.geolocation.watchPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });

    return () => {
      navigator.geolocation.clearWatch(watcher);
    };
  }, []);

  const container = useRef<HTMLDivElement>();

  const [pageSize, setPageSize] = useState({
    width: container.current?.offsetWidth,
    height: container.current?.offsetHeight,
  });

  const containerStyle = useMemo(() => {
    return {
      width: pageSize.width || 0,
      height: pageSize.height || 0, //- height of navbar,
    };
  }, [pageSize.width, pageSize.height]);

  useEffect(() => {
    const updatePageSize = (e: UIEvent) => {
      if (container.current === undefined) return;

      setPageSize({
        width: container.current?.offsetWidth,
        height: container.current?.offsetHeight,
      });
    };

    document.addEventListener("resize", updatePageSize);

    return () => {
      document.removeEventListener("resize", updatePageSize);
    };
  }, []);

  const getReference = (e: any) => {
    if (e !== undefined && container.current == null) {
      setPageSize({
        width: e.offsetWidth,
        height: e.offsetHeight,
      });
      container.current = e;
    }
  };

  return (
    <MapContainer ref={getReference}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY!}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        ></GoogleMap>
      </LoadScript>
    </MapContainer>
  );
}
