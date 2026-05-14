import { useEffect, useState } from "react";
import api from "../../axios/axios";
import TableTools from "../tables/BasicTables/TableTools";
import Select from "../form/Select";
import Label from "../form/Label";

interface MovimientosTableProps {
    refresh: number;
}

export default function MovimientosTable({
    refresh,
}: MovimientosTableProps) {

    const [tipo, setTipo] = useState<"compra" | "venta">("compra");

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {

        const obtenerDatos = async () => {

            try {

                const endpoint =
                    tipo === "compra"
                        ? "/api/compras"
                        : "/api/ventas";

                const response = await api.get(endpoint);

                setData(response.data);

            } catch (error) {
                console.error("Error:", error);
            }
        };

        obtenerDatos();

    }, [refresh, tipo]);

    const tipoOptions = [
        {
            value: "compra",
            label: "Compras",
        },
        {
            value: "venta",
            label: "Ventas",
        },
    ];

    const comprasFormateadas = data.map((item: any) => ({
        producto: item.id_producto?.nombre || "Sin producto",
        proveedor: item.id_proveedor?.nombre || "Sin proveedor",
        cantidad: item.cantidad || 0,
        precio_compra: Number(item.precio_compra || 0).toLocaleString("es-CO"),
        costo_total: Number(item.costo_total || 0).toLocaleString("es-CO"),
        fecha: new Date(item.fecha).toLocaleDateString("es-CO"),
    }));

    const ventasFormateadas = data.map((item: any) => ({
        producto: item.id_producto?.nombre || "Sin producto",
        usuario: item.id_usuario?.nombre || "Sin usuario",
        cantidad: item.cantidad || 0,
        precio_venta: Number(item.precio_venta || 0).toLocaleString("es-CO"),
        precio_total: Number(item.precio_total || 0).toLocaleString("es-CO"),
        fecha: new Date(item.fecha).toLocaleDateString("es-CO"),
    }));

    return (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">

            {/* SELECT */}
            <div className="max-w-xs">
                <Label>Mostrar</Label>

                <Select
                    options={tipoOptions}
                    defaultValue={tipoOptions[0]}
                    onChange={(option: any) =>
                        setTipo(option.value)
                    }
                />
            </div>

            {/* TABLA COMPRAS */}
            {tipo === "compra" ? (

                <TableTools
                    data={comprasFormateadas}
                    title="LISTADO COMPRAS"
                    fileName="compras.xlsx"
                    columns={[
                        {
                            key: "producto",
                            label: "Producto",
                        },
                        {
                            key: "proveedor",
                            label: "Proveedor",
                        },
                        {
                            key: "cantidad",
                            label: "Cantidad",
                        },
                        {
                            key: "precio_compra",
                            label: "Precio Compra",
                        },
                        {
                            key: "costo_total",
                            label: "Costo Total",
                        },
                        {
                            key: "fecha",
                            label: "Fecha",
                        },
                    ]}
                />

            ) : (

                /* TABLA VENTAS */
                <TableTools
                    data={ventasFormateadas}
                    title="LISTADO VENTAS"
                    fileName="ventas.xlsx"
                    columns={[
                        {
                            key: "producto",
                            label: "Producto",
                        },
                        {
                            key: "usuario",
                            label: "Usuario",
                        },
                        {
                            key: "cantidad",
                            label: "Cantidad",
                        },
                        {
                            key: "precio_venta",
                            label: "Precio Venta",
                        },
                        {
                            key: "precio_total",
                            label: "Precio Total",
                        },
                        {
                            key: "fecha",
                            label: "Fecha",
                        },
                    ]}
                />

            )}

        </div>
    );
}