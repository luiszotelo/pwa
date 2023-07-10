import { useEffect, useState } from "react";
import styles from "./Confirma.module.css";
import {  useParams } from "react-router-dom";
import { InfoService } from "../../components/InfoService";
import { ButtonConfirmPage } from "../../components/ButtonConfirmPage";

function ConfirmTravel() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const params = useParams();
  const origin = params.origin.split(",").map((e) => parseFloat(e));
  const destiny = params.destiny.split(",").map((e) => parseFloat(e));
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

  return (
    <>
      <div className={styles["main__confirma__viaje"]}>
        <InfoService />
        <ButtonConfirmPage
          latitude={latitude}
          longitude={longitude}
          origin={origin}
          destiny={destiny}
        />
      </div>
    </>
  );
}

export default ConfirmTravel;
