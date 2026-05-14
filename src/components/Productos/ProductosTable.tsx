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

  const productosFormateados = data.map((producto: any) => ({
    ...producto,
    proveedorNombre: producto.proveedor?.nombre || "Sin proveedor",
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <TableTools
        data={productosFormateados}
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
            key: "proveedorNombre",
            label: "Proveedor",
          },
          {
            key: "descripcion",
            label: "Descripción",
          },
          {
            key: "stockMinimo",
            label: "Stock Minimo",
          },
          {
            key: "stock",
            label: "Stock",
          },
        ]}
      />
    </div>
  );
}