import { useState } from "react";
import styles from "../styles/LabelMaps.module.css";
import Label from "./Label.jsx";
import { Modal } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
function LabelMaps() {
  const [modal, setModal] = useState(false);
  const onClick = () => {
    setModal(!modal);
  };
  return (
    <>
    <Tooltip title='Información pings'>
      <InfoCircleOutlined  style={{fontSize:"30px"}} className={styles.esquina} onClick={onClick} />

    </Tooltip>
      <Modal
        title="Basic Modal"
        open={modal}
        footer={null}
        onCancel={onClick}
        width={300}
      >
        <article >
          <Label color={"red"} label={"Ubicación Cliente"} />
          <Label color={"blue"} label={"Ubicación Proveedor"} />
          <Label color={"yellow"} label={"Destino"} />
        </article>
      </Modal>
    </>
  );
}

export default LabelMaps;
