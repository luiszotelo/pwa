import { Button, Modal } from "antd";
import { useState } from "react";
export const NewModal = ({
  btnType,
  textBtn,
  modalTitle,
  handleOk,
  footer,
  icon,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type={btnType} icon={icon} onClick={() => setOpen(true)}>
        {textBtn}
      </Button>
      <Modal
        title={modalTitle}
        open={open}
        onCancel={() => setOpen(false)}
        style={{ bottom: 0, left: 0 }}
        width={400}
        onOk={() => {
          handleOk();
          setOpen(false);
        }}
        {...footer}
      ></Modal>
    </>
  );
};
