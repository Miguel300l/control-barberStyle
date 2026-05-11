export interface Producto {
    _id: string;
    nombre: string;
    stock: number;
}

export interface Proveedor {
    _id: string;
    nombre: string;
}

export interface FormMovimiento {
    id_producto: string;
    id_proveedor: string;
    cantidad: string;
    precio: string;
    fecha: string;
}