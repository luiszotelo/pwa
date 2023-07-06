import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import mapboxgl, { Map, Marker } from 'mapbox-gl'
import { fbm } from "../firabase/firabase.js";
import { ServiceTrack } from "../firabase/models/serviceTrack.js";

const MapBox = () => {
  const [latitude, setLatitude] = useState(19.3644163);
  const [longitude, setLongitude] = useState(-99.1883323);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (!map.current) return;
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
    if (!mapRef.current) return;
    mapboxgl.accessToken = 'pk.eyJ1Ijoiem9tYXByb2plY3QiLCJhIjoiY2xqbTlpNmhwMHVwODNjcTl0czh5dnoyeCJ9.zRqxzA3XPV4MIHkawlunwg';
    map.current = new Map({
      container: mapRef.current, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [longitude, latitude], // starting position [lng, lat]
      zoom: 15 // starting zoom
    });
  }, [])

  useEffect(() => {

    if (!map.current) return;

/*
       setInterval(() => {
         setLongitude(longitude+0.0001)
         setLatitude((prev)=> prev + 0.0001);
        }, 9000)
*/


    marker.current?.remove();

    marker.current = new Marker()
      .setLngLat([longitude, latitude])
      .addTo(map.current)
      .setDraggable(true);
    map.current.flyTo({center: [longitude, latitude], zoom: 15})

  }, [latitude, longitude])


/*
  useEffect(() => {
      setInterval(()=> {
        console.log('latitude', latitude)
        fbm.updatePoints('eFQ1vlnd2rXZd0BxiDuW',{latitude: latitude, longitude: longitude} )
      },30000)
  }, []);
*/


  useEffect(() => {
    setInterval(()=> {
      updateMarker()
    },30000)
  }, []);


    const onClick = () => {
      fbm.createService(new ServiceTrack(1,2,[1,2],[1,2],[1,3]).toJSON())
    }

    const updateMarker = () => {
      console.log({longitude})
      fbm.updatePoints('6YgY9uQRK32YdVZ5KjJB',{latitude: latitude, longitude: longitude})
    }

  return (
    <>
      <div style={{height: '90vh', width: '90vw'}} ref={mapRef}>
      </div>
      <br />
      <br />
      <button onClick={onClick}>Crear Servicio</button>
      <button onClick={updateMarker}>Actualizar</button>
    </>
  );
};

export default MapBox;
