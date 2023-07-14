import { useState } from "react";
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
      <InfoCircleOutlined  style={{fontSize:"30px"}} className={'fixed top-5 left-5 z-40'} onClick={onClick} />

    </Tooltip>
      <Modal
        title="Basic Modal"
        open={modal}
        footer={null}
        onCancel={onClick}
        width={300}
      >
        <article  className="">
          <Label  />
        </article>
      </Modal>
    </>
  );
}

export default LabelMaps;
