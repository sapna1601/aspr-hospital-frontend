import { GoogleApiWrapper, Map as GMap, Marker } from "google-maps-react";
import React from "react";
import hospitalIcon from "src/assets/hospital.png";
interface IProps {
  google: any;
}

const Map: React.FC<IProps> = ({ google, ...props }) => {
  return (
    <GMap
      initialCenter={{
        lat: 16.844068,
        lng: 74.595427,
      }}
      google={google}
      {...props}
    >
      <Marker icon={hospitalIcon} title={"Gandhi Hospital Sangli"} />
    </GMap>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY as string,
})(Map);
