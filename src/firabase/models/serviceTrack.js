export class ServiceTrack{
  constructor(idServicio, idCliente,positionProveedor, positionClient, positionFinal ) {
    this.idServicio = idServicio
    this.idCliente = idCliente
    this.positionProveedor = positionProveedor
    this.positionClient = positionClient
    this.positionFinal = positionFinal
    this.trayectory =[]
  }
  toJSON(){
    return {
      idServicio: this.idServicio,
      idCliente: this.idCliente,
      positionProveedor: this.positionProveedor,
      positionClient: this.positionClient,
      positionFinal: this.positionFinal,
      date : new Date(),
      trajectory: []
    }
  }
}
