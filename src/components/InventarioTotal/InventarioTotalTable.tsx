import { useEffect, useState } from "react";
import api from "../../axios/axios";
import TableTools from "../tables/BasicTables/TableTools";

interface Inventario {
    id: string;
    nombre: string;
    codigo: string;
    stock_actual: number;
    stock_minimo: number;
    estado: "verde" | "amarillo" | "rojo";
    alerta: boolean;
}

interface InventarioTableProps {
    refresh: number;
}

export default function InventarioTable({
    refresh,
}: InventarioTableProps) {
    const [data, setData] = useState<Inventario[]>([]);

    useEffect(() => {
        const obtenerInventario = async () => {
            try {
                const response = await api.get("/api/movimientos/stock");
                setData(response.data);
            } catch (error) {
                console.error("Error al obtener inventario:", error);
            }
        };

        obtenerInventario();
    }, [refresh]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <TableTools
                data={data}
                title="INVENTARIO DE PRODUCTOS"
                fileName="inventario.xlsx"
                rowClass={(row) =>
                    row.estado === "rojo"
                        ? "bg-red-100"
                        : row.estado === "amarillo"
                            ? "bg-yellow-100"
                            : "bg-green-100"
                }
                columns={[
                    {
                        key: "nombre",
                        label: "Nombre",
                    },
                    {
                        key: "codigo",
                        label: "Código",
                    },
                    {
                        key: "stock_actual",
                        label: "Stock Actual",
                    },
                    {
                        key: "stock_minimo",
                        label: "Stock Mínimo",
                    },
                    {
                        key: "estado",
                        label: "Estado",
                    },
                ]}
            />
        </div>
    );
}