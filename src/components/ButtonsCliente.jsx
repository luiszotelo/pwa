import {
  AlertOutlined,
  InfoCircleOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { AlertService } from "../models/Alert";
import { NewModal } from "./NewModal";
import { createAlertService, shareLocation } from "../context/slices/serviceThunk";
export const ButtonsCliente = ({ idProveedor, idService }) => {
  const dispatch = useDispatch();
  const handleSendAlert = () => {
    dispatch(
      createAlertService(new AlertService(idService, idProveedor).toJSon())
    );
  };
  const handleOk = () => {
    console.log("ok");
  };

  const handleMessage = (ideService, number) => {
    dispatch(shareLocation(ideService, number));
  };

  return (
    <div>
      {/* Información del proveedor */}
      <NewModal
        btnType={"primary"}
        textBtn={"Ver información del servicio"}
        modalTitle={"Información del servicio"}
        icon={<InfoCircleOutlined />}
        handleOk={handleOk}
        footer={{ footer: null }}
      />
      {/* Compartir Información por sms */}
      <NewModal
        btnType={"primary"}
        textBtn={"Compartir ubicación"}
        icon={<MessageOutlined />}
        modalTitle={"Compartir ubicación"}
        handleOk={handleMessage}
        footer={{}}
      />
      {/* Enviar alerta de auxilio */}
      <NewModal
        btnType={"primary"}
        textBtn={"Enviar alerta de auxilio"}
        icon={<AlertOutlined />}
        modalTitle={"Alerta de auxilio"}
        handleOk={handleSendAlert}
      />
    </div>
  );
};
