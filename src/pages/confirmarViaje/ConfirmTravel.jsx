import { useEffect, useState } from "react";
import styles from "./Confirma.module.css";
import { useDispatch, useSelector } from "react-redux";
import { InfoService } from "../../components/InfoService";
import { ButtonConfirmPage } from "../../components/ButtonConfirmPage";
import { getServiceApi } from "../../context/slices/serviceThunk";
import { useParams } from "react-router-dom";

function ConfirmTravel() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const dispatch = useDispatch();
  const params = useParams();
  const { idService } = params;
  // hace el primer track de la ubicación
  useEffect(() => {
    const trackLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
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

  const {
    serviceApiSigsa: s, 
    serviceApiSigsaStatus,
  } = useSelector((state) => state.serviceReducer);

  useEffect(() => {
    dispatch(getServiceApi(idService));
  }, [dispatch,idService]);

  if (serviceApiSigsaStatus === "loading") return <h1>Cargando...</h1>;
  return (
    <>
      <div className={styles["main__confirma__viaje"]}>
        <InfoService  direccionDestino={s.direccionDestino} direccionOrigen={s.direccionOrigen} />
         
        <ButtonConfirmPage
          idService={idService}
          latitude={latitude}
          longitude={longitude}
          origin={[s.lngDestino, s.latOrigen]}
          destiny={[s.lngDestino, s.latDestino]}
        />
      </div>
    </>
  );
}

export default ConfirmTravel;
