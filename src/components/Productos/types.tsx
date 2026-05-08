export interface Producto {
  _id?: string;
  nombre: string;
  codigo: string;
  descripcion?: string;
  precioVenta: number;
  stock: number;
  stockMinimo?: number;
}
export interface ProductoForm {
  nombre: string;
  codigo: string;
  descripcion: string;
  precioVenta: string;
  stockMinimo: string;
}
