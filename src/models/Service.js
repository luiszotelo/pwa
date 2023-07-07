export class Service {
  constructor(idServicio, idCliente,positionProveedor, positionClient, positionFinal ) {
    this.idProveedor = idServicio
    this.idCliente = idCliente
    this.timeArrived =  null
    this.completedTime = null
    this.arrived = false
    this.positionProveedor = positionProveedor
    this.positionClient = positionClient
    this.positionFinal = positionFinal
    this.completed = false
    this.trayectory =[]
  }
  toJSON(){
    return {
      idServicio: this.idProveedor,
      idCliente: this.idCliente,
      timeArrived: this.timeArrived,
      completedTime: this.completedTime ,
      arrived: this.arrived,
      completed: this.completed,
      date:  new Date().toDateString(),
      positionProveedor: this.positionProveedor,
      positionClient: this.positionClient,
      positionFinal: this.positionFinal,
      trajectory: [],
    }
  }
}
