import { Card } from "antd";
const styles = {color: '#0071bc'}
export const InfoService = ( { direccionDestino, direccionOrigen }) => {
  return (
    <Card
      title="Información del Servicio"
      style={{
        width: 300,
      }}
    >
      <h2 style={styles}>Dirección Origen</h2>
      <p>{direccionOrigen}</p>

      <h2 style={styles}>Dirección Destino</h2>
      <p>{direccionDestino}</p>
    </Card>
  );
};
