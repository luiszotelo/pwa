import { Button, notification } from "antd";
import { AlertOutlined, MessageOutlined } from "@ant-design/icons";
import styles from "../pages/MapCliente/MapCliente.module.css";
import { useDispatch } from "react-redux";
import {
  createAlertService,
  shareLocation,
} from "../context/slices/serviceThunk";
import { AlertService } from "../models/Alert";
import { Modal } from "antd";
import { useState } from "react";
export const ButtonsAlertCliente = ({ idService, idProveedor }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isNumeroOpen, setIsNumeroOpen] = useState(false);
  const [number, setNumber] = useState('');
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, text, message) => {
    api[type]({
      message: `${message}`,
      description: `${text}`,
      duration: 1,
    });
    

  };
  const onClick = () => {
    dispatch(
      createAlertService(new AlertService(idService, idProveedor).toJSon())
    );
    setIsOpen(false);
    openNotificationWithIcon("success", "Se envió la alerta de auxilio", 'Envío con éxito');
  };

  const handleMessage = (ideService, number) => {
    if(!number) return openNotificationWithIcon("error", "Ingrese un número", 'Error')
    dispatch(shareLocation(ideService, number));
    setIsNumeroOpen(false);
    setNumber(null);
    openNotificationWithIcon(
      "success",
      "Se ha  compartido su ubicación por sms",
      'Envío con éxito'
    );
  };

  return (
    <>
      {contextHolder}
      <div className={styles.buttons}>
        <Button
          onClick={() => setIsOpen(true)}
          type="primary"
          danger
          icon={<AlertOutlined />}
        >
          Alerta de auxilio
        </Button>

        <Button
          type="primary"
          icon={<MessageOutlined />}
          onClick={() => setIsNumeroOpen(true)}
        >
          Enviar ubicación por sms
        </Button>
      </div>
      <Modal
        title={"Enviar una alerta"}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={onClick}
      >
        Se enviará una alerta de emergencia y un asesor se pondrá en contacto
        contigo
        <h2>¿ Desea Continuar ?</h2>
      </Modal>

      <Modal
        title={"Enviar ubicación por sms"}
        open={isNumeroOpen}
        onCancel={() => setIsNumeroOpen(false)}
        onOk={() => handleMessage(idService, number)}
      >
        <p>Ingresé el número con quien desea enviar compartir su ubicación</p>
        <input
          type="number"
          onChange={(e) => setNumber(e.target.value)}
          value={number}
        />
      </Modal>
    </>
  );
};
