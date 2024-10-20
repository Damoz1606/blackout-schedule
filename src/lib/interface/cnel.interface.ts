export interface CnelPayload {
    resp: string;
    mensaje: null;
    mensajeError: null;
    extra: null;
    notificaciones: Notification[];
}

export interface Notification {
    idUnidadNegocios: number;
    cuentaContrato: string;
    alimentador: string;
    cuen: string;
    direccion: string;
    fechaRegistro: string;
    detallePlanificacion: PlanificationDetail[];
}

export interface PlanificationDetail {
    alimentador: string;
    fechaCorte: string;
    horaDesde: string;
    horaHasta: string;
    comentario: string;
    fechaRegistro: string;
    fechaHoraCorte: string;
}