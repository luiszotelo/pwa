export class AlertService {
  constructor(idService,idProveedor) {
    this.idService = idService;
    this.idProveedor = idProveedor;
  }
  toJSon() {
    return {
      idService: this.idService,
      idProveedor: this.idProveedor,
      atendida: false,
    };
  }
}
