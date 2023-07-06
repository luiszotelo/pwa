import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import mapboxgl, {Map, Marker} from 'mapbox-gl'

const MapBox = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  useEffect(() => {
    const trackLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setError(null);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    trackLocation();

  }, [latitude, longitude])

  useLayoutEffect(() => {
      mapboxgl.accessToken = 'pk.eyJ1Ijoiem9tYXByb2plY3QiLCJhIjoiY2xqbTlpNmhwMHVwODNjcTl0czh5dnoyeCJ9.zRqxzA3XPV4MIHkawlunwg';
      const map = new Map({
        container: mapRef.current, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [longitude, latitude], // starting position [lng, lat]
        zoom: 15 // starting zoom
      });
    new Marker()
      .setLngLat(map.getCenter())
      .addTo(map)
  }, [latitude,longitude])


  return (
    <>
      <div style={{height: '90vh', width: '90vw'}} ref={mapRef}>
      </div>
     <br/>
     <br/>
      <div style={{background: 'red', marginTop: '100px'}}>
        {error && <p>{error}</p>}
        {latitude && <p>Latitude: {latitude}</p>}
        {longitude && <p>Longitude: {longitude}</p>}
      </div>
    </>
  );
};

export default MapBox;
