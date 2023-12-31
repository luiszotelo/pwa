/* eslint-disable react-hooks/exhaustive-deps */
import { MessageOutlined } from "@ant-design/icons";
import { Map, Marker } from "mapbox-gl";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NewModal } from "../../components";
import { ButtonsAlertCliente } from "../../components/ButtonAlert";
import LabelMaps from "../../components/LabelMaps";
import {
  setLatitude,
  setLongitude,
  setService,
} from "../../context/slices/serviceSlice";
import { updatePointService } from "../../context/slices/serviceThunk";
import { fbm } from "../../services/firabase/firabase";
import styles from "./MapCliente.module.css";
import { ButtonsCliente } from "../../components/ButtonsCliente";

const MapCliente = () => {
  const mapRef = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const dispatch = useDispatch();

  const { latitude, longitude, loading, service } = useSelector(
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
  }, [idService, dispatch]);

  useLayoutEffect(() => {
    if (!mapRef.current) return;
    if (loading) return;
    map.current = new Map({
      container: mapRef.current, // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [longitude, latitude], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    new Marker({ color: "orange" })
      .setLngLat(service.positionClient)
      .addTo(map.current);
  }, [loading]);

  useEffect(() => {
    if (!map.current) return;
    marker.current?.remove();

    marker.current = new Marker({ color: "blue" })
      .setLngLat([longitude, latitude])
      .addTo(map.current)
      .setDraggable(true);

    // const bounds = [[service.positionClient[0], service.positionClient[1]], [longitude,latitude]]
    // map.current.fitBounds(bounds, {
    //   padding: 200,
    // });
    map.current.flyTo({ center: [longitude, latitude], zoom: 13 });
  }, [latitude, longitude, service.positionClient]);

  useEffect(() => {
    dispatch(updatePointService(idService));
  }, [idService, dispatch]);

  return (
    <>
      <Helmet>
        <title>Cliente</title>
      </Helmet>
      <LabelMaps />
      <section className={'fixed bottom-3 left-3  bg-orange-400'}>
        {/* <div className={styles["map-cliente"]} ref={mapRef}></div> */}

        <ButtonsCliente />
      </section>
    </>
  );
};

export default MapCliente;
