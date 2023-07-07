import { useEffect, useState } from 'react'
import styles from '../styles/Confirma.module.css'
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "../models/service.js";
import { fbm } from "../firabase/firabase.js";

function ConfirmTravel() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const params = useParams()
  const navigate = useNavigate()
  const origin = params.origin.split(',').map( (e) => parseFloat(e) )
  const destiny = params.destiny.split(',').map( (e) => parseFloat(e) )
  console.log({origin,destiny})

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

  }, [latitude, longitude])

  const onClick = () => {
    const service = new Service(2,2,[longitude,latitude ], origin, destiny)
    fbm.createService(service.toJSON()).then(
      idService => navigate(`/travel/${idService}`)
    )
  }

  return (
    <main className={styles['aceptar-viaje']}>
      <Button  onClick={onClick} type={'primary'}>Aceptar Viaje</Button>
    </main>
  )
}

export default ConfirmTravel
