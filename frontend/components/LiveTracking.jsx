import React, { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 0,
  lng: 0,
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handlePositionUpdate = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({
        lat: latitude,
        lng: longitude,
      });
    };

    const handleError = (error) => {
      setError(error.message);
      console.error("Geolocation error:", error);
    };

    // Get initial position
    navigator.geolocation.getCurrentPosition(handlePositionUpdate, handleError);

    // Watch for position changes
    const watchId = navigator.geolocation.watchPosition(
      handlePositionUpdate,
      handleError
    );

    // Set up periodic updates
    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        handlePositionUpdate,
        handleError
      );
    }, 10000); // Update every 10 seconds

    // Cleanup
    return () => {
      navigator.geolocation.clearWatch(watchId);
      clearInterval(intervalId);
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  //   console.log(import.meta.env.VITE_GOOGLE_MAPS_API);
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTracking;
