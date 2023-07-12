export class Service {
  constructor(
    idServicio,
    positionProveedor,
    positionClient,
    positionFinal,
    trajectory
  ) {
    this.idServicio = idServicio;
    this.timeArrived = null;
    this.completedTime = null;
    this.arrived = false;
    this.positionProveedor = positionProveedor;
    this.positionClient = positionClient;
    this.positionFinal = positionFinal;
    this.completed = false;
    this.trajectory = trajectory;
  }
  toJSON() {
    return {
      idServicio: this.idServicio,
      arrivedTime: this.timeArrived,
      completedTime: this.completedTime,
      arrived: this.arrived,
      completed: this.completed,
      date: new Date().toDateString(),
      positionProveedor: this.positionProveedor,
      positionClient: this.positionClient,
      positionFinal: this.positionFinal,
      trajectory: this.trajectory,
    };
  }
}
