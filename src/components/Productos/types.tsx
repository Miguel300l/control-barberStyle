export interface Producto {
  _id?: string;
  nombre: string;
  codigo: string;
  descripcion?: string;
  stock?: number;
  stockMinimo?: number;
  proveedor: string;
}
export interface ProductoForm {
  nombre: string;
  codigo: string;
  descripcion: string;
  stock: string;
  stockMinimo: string;
  proveedor: string;
}
