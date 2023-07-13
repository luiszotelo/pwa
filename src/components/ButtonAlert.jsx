import { Button } from "antd";
import { AlertOutlined, MessageOutlined } from "@ant-design/icons";
import styles from "../pages/MapCliente/MapCliente.module.css";
import { useDispatch } from "react-redux";
import { createAlertService } from "../context/slices/serviceThunk";
import { AlertService } from "../models/Alert";
import { Modal } from "antd";
import { useState } from "react";

export const ButtonAlert = ({ idService, idProveedor }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  console.log({ idService, idProveedor });
  const onClick = () => {
    dispatch(
      createAlertService(new AlertService(idService, idProveedor).toJSon())
    );
    setIsOpen(false);
  };
  return (
    <>
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
          danger
          icon={<MessageOutlined /> }
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
        Se enviará una alerta de emergencia y un asesor se pondra en contacto
        contigo
        <h2>¿ Desea Continuar ?</h2>
      </Modal>
    </>
  );
};
