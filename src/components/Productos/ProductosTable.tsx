import { useEffect, useState } from "react";
import api from "../../axios/axios";
import { Producto } from "./types";
import TableTools from "../tables/BasicTables/TableTools";

interface ProductosTableProps {
  refresh: number;
}

export default function ProductosTable({
  refresh,
}: ProductosTableProps) {
  const [data, setData] = useState<Producto[]>([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await api.get("/api/productos");

        setData(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    obtenerProductos();
  }, [refresh]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <TableTools
        data={data}
        title="LISTADO PRODUCTOS"
        fileName="productos.xlsx"
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
            key: "descripcion",
            label: "Descripción",
          },
          {
            key: "precioVenta",
            label: "Precio",
          },
          {
            key: "stockMinimo",
            label: "Stock",
          },
        ]}
      />
    </div>
  );
}