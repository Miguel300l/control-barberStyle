import { useEffect, useState } from "react";
import api from "../../axios/axios";
import TableTools from "../tables/BasicTables/TableTools";
import Select from "../form/Select";
import Label from "../form/Label";

interface MovimientosTableProps {
    refresh: boolean;
    filtros: {
        desde: string;
        hasta: string;
        tipo: string;
    };
}

interface Movimiento {
    tipo: string;
    id: string;
    producto: string;
    usuario?: string;
    proveedor?: string;
    cantidad: number;
    precio_unitario: number;
    total: number;
    fecha: string;
}

export default function MovimientosTable({
    refresh,
    filtros,
}: MovimientosTableProps) {
    const [tipo, setTipo] = useState<
        "ambos" | "compra" | "venta"
    >("ambos");

    const [data, setData] = useState<Movimiento[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                setLoading(true);

                const response = await api.get(
                    "/api/movimientos",
                    {
                        params: {
                            desde: filtros.desde,
                            hasta: filtros.hasta,
                            tipo:
                                filtros.tipo === "ambos"
                                    ? tipo
                                    : filtros.tipo,
                        },
                    }
                );

                setData(response.data.movimientos || []);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (filtros.desde && filtros.hasta) {
            obtenerDatos();
        }
    }, [refresh, tipo, filtros]);

    const tipoOptions = [
        {
            value: "ambos",
            label: "Ambos",
        },
        {
            value: "compra",
            label: "Compras",
        },
        {
            value: "venta",
            label: "Ventas",
        },
    ];

    const movimientosFormateados = data.map(
        (item) => ({
            tipo:
                item.tipo.charAt(0).toUpperCase() +
                item.tipo.slice(1),

            producto: item.producto,

            usuario_proveedor:
                item.usuario ||
                item.proveedor ||
                "Sin registro",

            cantidad: item.cantidad,

            precio_unitario:
                `$${item.precio_unitario.toLocaleString(
                    "es-CO"
                )}`,

            total:
                `$${item.total.toLocaleString("es-CO")}`,

            fecha: new Date(
                item.fecha
            ).toLocaleDateString("es-CO"),
        })
    );

    return (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">

            {/* TABLA */}
            {loading ? (
                <p>Cargando movimientos...</p>
            ) : (
                <TableTools
                    data={movimientosFormateados}
                    title="LISTADO MOVIMIENTOS"
                    fileName="movimientos.xlsx"
                    columns={[
                        {
                            key: "tipo",
                            label: "Tipo",
                        },
                        {
                            key: "producto",
                            label: "Producto",
                        },
                        {
                            key: "usuario_proveedor",
                            label: "Proveedor",
                        },
                        {
                            key: "cantidad",
                            label: "Cantidad",
                        },
                        {
                            key: "precio_unitario",
                            label: "Precio Unitario",
                        },
                        {
                            key: "total",
                            label: "Total",
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