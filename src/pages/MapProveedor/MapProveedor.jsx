import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./MapProveedor.module.css";
import { Helmet } from "react-helmet";
import mapboxgl, {  LngLat, LngLatBounds, Map, Marker } from "mapbox-gl";
import { fbm } from "../../services/firabase/firabase.js";
import { useParams } from "react-router-dom";
import LabelMaps from "../../components/LabelMaps.jsx";
import { setService } from "../../context/slices/serviceSlice.js";
import { ButtonsMapProveedor } from "../../components";

const MapProveedor = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [positionClient, setPositionClient] = useState([0, 0]); // [lng, lat
  const [positionFinal, setPositionFinal] = useState([0, 0]); // [lng, lat
  const mapRef = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const { idService } = useParams();
  const dispatch = useDispatch();
  const [intervalId, setIntervalId] = useState(null);
  const { completed } = useSelector((state) => state.serviceReducer.service);

  useEffect(() => {
    fbm.getService(idService).then((service) => {
      setLatitude(service.positionProveedor[1]);
      setLongitude(service.positionProveedor[0]);
      setPositionClient(service.positionClient);
      setPositionFinal(service.positionFinal);
      dispatch(setService(service));
    });
  }, [idService]);

  /*
     Obtiene en tiempo real la ubicación del usuario
   */
  useEffect(() => {
    if (!map.current) return;
    const trackLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    trackLocation();
  }, [latitude, longitude]);
  // crear el mapa
  useLayoutEffect(() => {
    if (!positionClient[0]) return;
    if (!mapRef.current) return;
    mapboxgl.accessToken =
      "pk.eyJ1Ijoiem9tYXByb2plY3QiLCJhIjoiY2xqbTlpNmhwMHVwODNjcTl0czh5dnoyeCJ9.zRqxzA3XPV4MIHkawlunwg";
    map.current = new Map({
      container: mapRef.current, // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [longitude, latitude], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });
    new Marker({ color: "yellow" })
      .setLngLat(positionClient)
      .addTo(map.current);

    new Marker({ color: "red" }).setLngLat(positionFinal).addTo(map.current);
  }, [positionClient, positionFinal]);

  useEffect(() => {
    if (!map.current) return;

    // setInterval(() => {
    //   setLongitude(longitude + 0.001)
    //   setLatitude((prev) => prev + 0.001);
    // }, 3000)

    marker.current?.remove();

    marker.current = new Marker({ color: "blue" })
      .setLngLat([longitude, latitude])
      .addTo(map.current)
      .setDraggable(true);
    // map.current.flyTo({ center: [longitude, latitude], zoom: 15 });
    const sw = new LngLat(positionClient[0],positionClient[1])
    const sf = new LngLat(positionFinal[0],positionFinal[1])
    const sx = new LngLat(longitude,latitude)
    const bounds = new LngLatBounds(sw,sf,sx)
    map.current.fitBounds(bounds,{
      padding: 200
    })
  }, [latitude, longitude,positionClient,positionFinal]);

  // Actuliza la ubicación del proveedor cada 30 segundos

  useEffect(() => {
    const interval = setInterval(() => {
      fbm.updatePoints(idService, { latitude: latitude, longitude: longitude });
      console.log({ longitude, latitude });
    }, 30000);
    setIntervalId(interval);
  }, []);

  useEffect(() => {
    if (completed) {
      clearInterval(intervalId);
    }
  }, [completed, intervalId, latitude]);

  return (
    <>
      <Helmet>
        <title>Mapa Proveedor</title>
      </Helmet>
      <LabelMaps />
      <section className={styles["map-container"]}>
        <div className={styles.map} ref={mapRef}></div>
      </section>
      <section className={styles["buttons"]}>
        <ButtonsMapProveedor id={idService} interval={intervalId} />
      </section>
    </>
  );
};

export default MapProveedor;
