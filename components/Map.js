import { LocationMarkerIcon } from "@heroicons/react/solid";
import { getCenter } from "geolib";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
function Map({ searchResult }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  console.log(selectedLocation);
  const coordinates = searchResult.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));
  const center = getCenter(coordinates);

  const [viewport, setViewPort] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });
  return (
    <ReactMapGL
      {...viewport}
      mapStyle={`mapbox://styles/minhajurrohoman9016/ckxhd5wg23qai14mx8fqrl31k`}
      mapboxApiAccessToken={process.env.map_key}
      onViewportChange={(newViewPort) => setViewPort(newViewPort)}
    >
      {searchResult.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              onClick={() => {
                setSelectedLocation(result);
              }}
              className=" cursor-pointer animate-bounce"
            >
              <LocationMarkerIcon className="h-5 text-red-500" />
            </p>
          </Marker>
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
