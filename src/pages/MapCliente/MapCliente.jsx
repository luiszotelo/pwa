import { useEffect, useLayoutEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import mapboxgl, { LngLat, LngLatBounds, Map, Marker } from "mapbox-gl";
import { fbm } from "../../services/firabase/firabase.js";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setService } from "../../context/slices/serviceSlice.js";
import { setServiceAndUpdateCoordinates } from "../../context/slices/serviceSlice.js";

const MapCliente = () => {
  const { latitude, longitude, service } = useSelector(
    (state) => state.serviceReducer
  );
  const mapRef = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const { idService } = useParams();
  const dispatch = useDispatch();
//   Se trae el servicio al montar el componente
  useEffect(() => {
    fbm.getService(idService).then((service) => {
      dispatch(setService(service));
    });
  }, [idService]);
// monta el mapa
  useLayoutEffect(() => {
    if (!mapRef.current) return;
    mapboxgl.accessToken =
      "pk.eyJ1Ijoiem9tYXByb2plY3QiLCJhIjoiY2xqbTlpNmhwMHVwODNjcTl0czh5dnoyeCJ9.zRqxzA3XPV4MIHkawlunwg";
    map.current = new Map({
      container: mapRef.current, // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [longitude, latitude], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });
  }, []);

  useEffect(() => {
    if (!map.current) return;

    marker.current?.remove();

    marker.current = new Marker()
      .setLngLat([longitude, latitude])
      .addTo(map.current)
      .setDraggable(true);
    map.current.flyTo({ center: [longitude, latitude], zoom: 15 });
  }, [latitude, longitude]);

  useEffect(() => {
    fbm.obtenerDocumentoPorID(idService, (data) => {
      dispatch(setServiceAndUpdateCoordinates(data));
		// const ponintA = new LngLat(service.positionFinal[0],service.positionFinal[0])
		// const pointB = new LngLat(service.positionClient[0], service.positionClient[1])
		// const pointC = new LngLat(longitude, latitude)
		// const bounds = new LngLatBounds(ponintA,ponintA,pointC)
		// map.current.fitBounds(bounds, {
		// 	padding: 200
		// })
    });
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
