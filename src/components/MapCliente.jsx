import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import mapboxgl, { Map, Marker } from 'mapbox-gl'
import { fbm } from "../firabase/firabase.js";
import { useParams } from "react-router-dom";

const MapCliente = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const mapRef = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const {idService} = useParams()
  useEffect(() => {
    fbm.getService(idService).then(
      service => {
        setLatitude(service.positionProveedor[1])
        setLongitude(service.positionProveedor[0])
      }
    )
  }, [idService])


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

    marker.current?.remove();

    marker.current = new Marker()
      .setLngLat([longitude, latitude])
      .addTo(map.current)
      .setDraggable(true);
    map.current.flyTo({center: [longitude, latitude], zoom: 15})

  }, [latitude, longitude])


  useEffect(() => {
    fbm.obtenerDocumentoPorID(idService,  (data) => {
      const length = data.trajectory.length
      setLatitude(data.trajectory[length - 1].latitude)
      setLongitude(data.trajectory[length - 1].longitude)
    })
  }, []);

  return (
    <>
      <Helmet>
        <title>Mapa Cliente</title>
    </Helmet>
      <div style={{height: '90vh', width: '90vw'}} ref={mapRef}>
      </div>
    </>
  );
};

export default MapCliente;
