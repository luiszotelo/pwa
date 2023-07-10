import { Button } from "antd";
import { fbm } from "../services/firabase/firabase";
import { useNavigate } from "react-router-dom";
import { Service } from "../models/service";

export const ButtonConfirmPage = ({ latitude, longitude, origin, destiny }) => {
  const navigate = useNavigate();
  const onClick = () => {
    const service = new Service(2, 2, [longitude, latitude], origin, destiny);
    fbm
      .createService(service.toJSON())
      .then((idService) => navigate(`/travel/proveedor/${idService}`));
  };

  const handleRechazar = () => {
    navigate("/");
  };
  return (
    <>
      <section>
        <Button
          onClick={onClick}
          size="large"
          type={"primary"}
          style={{ marginRight: "1rem" }}
        >
          Aceptar Servicio
        </Button>
        <Button onClick={handleRechazar} size="large" type={"primary"} danger>
          Rechazar Servicio
        </Button>
      </section>
    </>
  );
};
