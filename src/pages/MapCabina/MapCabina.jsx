import { useLayoutEffect } from "react";
import { useRef } from "react";
import { Map} from "mapbox-gl";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createMarkers} from "../../context/slices/cabinaThunks";
import { StuffCabina } from "./StuffCabina";
const MapCabina = () => {
  const mapRef = useRef(null);
  const map = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if(!map.current) return
    dispatch(createMarkers(map.current))
  }, [dispatch]);
  useLayoutEffect(() => {
    if (!mapRef.current) return;
    map.current = new Map({
      container: mapRef.current, // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [-99.1332, 19.4326],
      zoom: 15,
    });
    const boundsMexico = [
      [-118.599, 32.534],
      [-86.71, 14.55],
    ];
    map.current.fitBounds(boundsMexico, { padding: 20 });
  }, []);
  return (
    <>
      <div ref={mapRef} style={{ width: "100vw", height: "100vh" }}></div>
      <StuffCabina map={map}/>
    </>
  );
};

export default MapCabina;
