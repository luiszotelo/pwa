export class Service {
  constructor(idServicio, idCliente,positionProveedor, positionClient, positionFinal ) {
    this.idProveedor = idServicio
    this.idCliente = idCliente
    this.positionProveedor = positionProveedor
    this.positionClient = positionClient
    this.positionFinal = positionFinal
    this.trayectory =[]
  }
  toJSON(){
    return {
      idServicio: this.idProveedor,
      idCliente: this.idCliente,
      date:  new Date(),
      positionProveedor: this.positionProveedor,
      positionClient: this.positionClient,
      positionFinal: this.positionFinal,
      trajectory: []
    }
  }
}
