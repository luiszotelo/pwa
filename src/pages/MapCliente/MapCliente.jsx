import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import { fbm } from "../../services/firabase/firabase";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setLatitude,
  setLongitude,
  setService,
} from "../../context/slices/serviceSlice";
import { updatePointService } from "../../context/slices/serviceThunk";

const MapCliente = () => {
  const mapRef = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const dispatch = useDispatch();

  const { latitude, longitude, loading } = useSelector(
    (state) => state.serviceReducer
  );

  const { idService } = useParams();
  useEffect(() => {
    fbm.getService(idService).then((service) => {
      const l = service.trajectory.length;
      dispatch(setService(service));
      dispatch(setLongitude(service.trajectory[l - 1]?.longitude));
      dispatch(setLatitude(service.trajectory[l - 1]?.latitude));
    });
  }, [idService]);

  useLayoutEffect(() => {
    if (!mapRef.current) return;
    if(loading) return
    mapboxgl.accessToken =
      "pk.eyJ1Ijoiem9tYXByb2plY3QiLCJhIjoiY2xqbTlpNmhwMHVwODNjcTl0czh5dnoyeCJ9.zRqxzA3XPV4MIHkawlunwg";
    map.current = new Map({
      container: mapRef.current, // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [longitude, latitude], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });
    // new Marker()
    // 	.setLngLat([service.positionClient[0], service.positionClient[1]])
  }, [loading]);

  useEffect(() => {
    if (!map.current) return;
    marker.current?.remove();

    marker.current = new Marker()
      .setLngLat([longitude, latitude])
      .addTo(map.current)
      .setDraggable(true);
    // map.current.flyTo({center: [longitude, latitude], zoom: 15})
  }, [latitude, longitude]);

  useEffect(() => {
      dispatch(updatePointService(idService))
  }, []);

  return (
    <>
      <Helmet>
        <title>Mapa Cliente</title>
      </Helmet>
      <div style={{ height: "90vh", width: "90vw" }} ref={mapRef}></div>
    </>
  );
};

export default MapCliente;
