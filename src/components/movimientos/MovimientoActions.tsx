import api from "../../axios/axios";

export const obtenerProductos = async () => {
    const res = await api.get("/api/productos", {
        withCredentials: true,
    });

    return res.data;
};

export const obtenerProveedores = async () => {
    const res = await api.get("/api/proveedores", {
        withCredentials: true,
    });

    return res.data;
};

export const crearCompra = async (data: any) => {
    return await api.post("/api/compras", data, {
        withCredentials: true,
    });
};

export const crearVenta = async (data: any) => {
    return await api.post("/api/ventas", data, {
        withCredentials: true,
    });
};