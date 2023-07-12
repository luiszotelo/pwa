import { Button, Drawer, Alert } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fbm } from "../../services/firabase/firabase";
import styles from "./MapCabina.module.css";
import { setAlerts } from "../../context/slices";

export const AlertsCabina = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { alerts } = useSelector((state) => state.cabinaReducer);

  useEffect(() => {
    fbm.observarAlert((data) => dispatch(setAlerts(data)));
  }, [dispatch]);

  const handleUpdate = (id) => {
    console.log(id)
    fbm.updateStatusAlert(id);
  };
  return (
    <div className={styles['btn-alerts']}>
      <Button
        icon={<BellOutlined />}
        size="large"
        className={styles["btn-notificacion"]}
        onClick={() => setOpen(true)}
      >
        {alerts.length ? <span className={styles["number__notification"]}>{alerts.length}</span> : ''}
      </Button>
      <Drawer
        open={open}
        title="Notificaciones"
        placement="right"
        onClose={() => setOpen(false)}
      >
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            message="Alerta Pánico"
            showIcon
            className={styles["card-alert"]}
            description={`El usuario  ha emitido una alerta de pánico`}
            type="warning"
            action={
              <Button size="small" type="primary"  onClick={() => handleUpdate(alert.id)}>
                Aceptar
              </Button>
            }
         />
        ))}
      </Drawer>
      
    </div>
  );
};
