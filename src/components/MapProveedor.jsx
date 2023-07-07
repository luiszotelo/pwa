import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { Button } from 'antd';
import styles from '../styles/MapProveedor.module.css' 
import { Helmet } from 'react-helmet';
import mapboxgl, { Map, Marker } from 'mapbox-gl'
import { fbm } from "../firabase/firabase.js";
import { useParams } from "react-router-dom";
import LabelMaps from './LabelMaps.jsx';
import { setService, updatedArrived } from '../context/slices/serviceSlice.js';

const MapProveedor = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [positionClient, setPositionClient] = useState([0, 0]); // [lng, lat
  const [positionFinal, setPositionFinal] = useState([0, 0]); // [lng, lat
  const mapRef = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const {idService} = useParams()
  const dispatch = useDispatch()

  const { arrived, completed } = useSelector(state =>  state.serviceReducer)
  console.log({arrived, completed})
  useEffect(() => {
    fbm.getService(idService).then(
      service => {
        setLatitude(service.positionProveedor[1])
        setLongitude(service.positionProveedor[0])
        setPositionClient(service.positionClient)
        setPositionFinal(service.positionFinal)
        dispatch(setService(service)) 
      }
    )
  }, [idService])

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

  }, [latitude, longitude])
// crear el mapa
  useLayoutEffect(() => {
    if(!positionClient[0]) return;
    if (!mapRef.current) return;
    mapboxgl.accessToken = 'pk.eyJ1Ijoiem9tYXByb2plY3QiLCJhIjoiY2xqbTlpNmhwMHVwODNjcTl0czh5dnoyeCJ9.zRqxzA3XPV4MIHkawlunwg';
    map.current = new Map({
      container: mapRef.current, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [longitude, latitude], // starting position [lng, lat]
      zoom: 15 // starting zoom
    });
       new Marker({ color: 'yellow' })
       .setLngLat(positionClient)
       .addTo(map.current)

       new Marker({ color: 'red' })
       .setLngLat(positionFinal)
       .addTo(map.current)
  }, [positionClient, positionFinal])

  useEffect(() => {

    if (!map.current) return;



  // setInterval(() => {
  //   setLongitude(longitude + 0.001)
  //   setLatitude((prev) => prev + 0.001);
  // }, 30000)


    marker.current?.remove();

    marker.current = new Marker({color: 'blue'})
      .setLngLat([longitude, latitude])
      .addTo(map.current)
      .setDraggable(true);
    map.current.flyTo({center: [longitude, latitude], zoom: 15})

  }, [latitude, longitude])


useEffect(() => {
  setInterval(() => {
    updateMarker()
  }, 30000)
},);



  const updateMarker = () => {
    fbm.updatePoints(idService, {latitude: latitude, longitude: longitude})
    console.log({longitude, latitude})
  }

  const updateStatusArrived = () => {
    // fbm.updateStatus(idService, {arrived: true})
    dispatch(updateStatusArrived)
  }
  const updateStatusCompleted = () => {
    // fbm.updateStatus(idService, { completed: true })
    dispatch(updateStatusCompleted)
  }

  return (
    <>
      <Helmet>
        <title>Mapa Proveedor</title>
    </Helmet>
    <LabelMaps/>
      <section className={styles['map-container']}>
      <div  className={styles.map}  ref={mapRef}>
      </div>
    </section>
      <section className={styles['buttons']}>
        <Button type='primary' disabled={completed} onClick={() => dispatch(updatedArrived)}>Confirmar Arrivo</Button>
        <Button type='primary' danger  disabled={arrived} onClick={()=> dispatch(updateStatusCompleted)}>Finalizar Servicio</Button>
    </section>
    </>
  );
};

export default MapProveedor;
