export interface Alumno {
  _id?: string;
  nombres: string;
  apellidos: string;
  tipoDocumento: "Cédula" | "Tarjeta de identidad";
  documento: string;
  celular: string;
  edad: number;
  totalCurso: number;
  abono: number;
  fecha: string;
  saldoPendiente?: number;
}

export interface AlumnoForm {
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  documento: string;
  celular: string;
  edad: string;
  totalCurso: string;
  abono: string;
  fecha: string;
  saldoPendiente: string;
}