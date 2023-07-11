import { Button, Drawer, Alert } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./MapCabina.module.css";
import { useEffect } from "react";
import { fbm } from "../../services/firabase/firabase";
import { useDispatch, useSelector } from "react-redux";
import { setAlerts } from "../../context/slices";

const MapCabina = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { alerts } = useSelector((state) => state.mapReducer);
  
  useEffect(() => {
    fbm.observarAlert((data) => dispatch(setAlerts(data)));
  }, [dispatch]);
  const onClick = () => {
    fbm.updateStatusAlert()
  }
  return (
    <>
      <Button
        icon={<BellOutlined />}
        size="large"
        className={styles["btn-notificacion"]}
        onClick={() => setOpen(true)}
      >
        <span className={styles["number__notification"]}>1</span>
      </Button>
      <Drawer
        open={open}
        title="Notificaciones"
        placement="right"
        onClose={() => setOpen(false)}
      >
        {alerts.map((alert) => (
          <Alert
          key={alert.idProveedor}
            message="Error Text"
            showIcon
            description={`El usuario  ha emitido una alerta de pánico`}
            type="warning"
            action={
              <Button size="small" type="primary" onClick={onClick}>
                Aceptar
              </Button>
            }
          />
        ))}
      </Drawer>
    </>
  );
};

export default MapCabina;
