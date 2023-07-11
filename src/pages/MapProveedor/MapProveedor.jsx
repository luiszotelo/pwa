import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./MapProveedor.module.css";
import { Helmet } from "react-helmet";
import { LngLat, LngLatBounds, Map, Marker } from "mapbox-gl";
import { fbm } from "../../services/firabase/firabase.js";
import { useParams } from "react-router-dom";
import LabelMaps from "../../components/LabelMaps.jsx";
// eslint-disable-next-line no-unused-vars
import {
  mvCorrdinates,
  setLatitude,
  setLongitude,
  setService,
} from "../../context/slices/serviceSlice.js";
import { ButtonsMapProveedor } from "../../components";
import { updatePoints } from "../../context/slices/serviceThunk";

const MapProveedor = () => {
  const [positionClient, setPositionClient] = useState([0, 0]); // [lng, lat
  const [positionFinal, setPositionFinal] = useState([0, 0]); // [lng, lat
  const mapRef = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const { idService } = useParams();
  const dispatch = useDispatch();
  const [intervalId, setIntervalId] = useState(null);
  const { completed } = useSelector((state) => state.serviceReducer.service);
  const { latitude, longitude } = useSelector((state) => state.serviceReducer);

  console.log("redux", latitude);

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
    const trackLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            dispatch(setLatitude(position.coords?.latitude));
            dispatch(setLongitude(position.coords?.longitude));
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
  }, [latitude, longitude, dispatch]);
  // crear el mapa

  useLayoutEffect(() => {
    if (!positionClient[0]) return;
    if (!mapRef.current) return;
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

    marker.current?.remove();

    marker.current = new Marker({ color: "blue" })
      .setLngLat([longitude, latitude])
      .addTo(map.current)
      .setDraggable(true);
    map.current.flyTo({ center: [longitude, latitude], zoom: 15 });
    // const sf = new LngLat(positionFinal[0], positionFinal[1]);
    // const sx = new LngLat(-99.150579, 19.3321405);
    // const bounds = new LngLatBounds( ).extend({lat: latitude, lng: longitude}).extend({lat: positionClient[1], lng:positionClient[0]})
    // map.current.fitBounds(bounds, {
    //   padding: 200,
    // });
  }, [latitude, longitude, positionClient, positionFinal]);

  // Actualiza la ubicación del proveedor cada 30 segundos

  useEffect(() => {
    // if(!latitude) return
    const interval = setInterval(() => {
      dispatch(mvCorrdinates());
      dispatch(updatePoints(idService));
    }, 3000);
    setIntervalId(interval);
  }, []);

  useEffect(() => {
    if (completed) {
      clearInterval(intervalId);
    }
  }, [completed, intervalId, latitude]);
  // if(!map.current) return 'Esta mierda no funciona'
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
