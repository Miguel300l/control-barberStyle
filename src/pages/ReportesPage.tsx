import { useEffect, useState } from "react";
import Label from "../components/form/Label";
import Select from "../components/form/Select";
import TableTools from "../components/tables/BasicTables/TableTools";
import api from "../axios/axios";

interface Producto {
  _id: string;
  nombre: string;
}

interface ReporteProveedor {
  proveedorId: string;
  nombreProveedor: string;
  correoProveedor: string;
  telefonoProveedor: string;

  precioMasBarato: number;
  promedioPrecio: number;
  totalCompras: number;
}

interface ProductosTableProps {
  refresh?: number;
}

const formatCOP = (value: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
};

export default function ProductosTable({
  refresh,
}: ProductosTableProps) {
  const [productos, setProductos] = useState<Producto[]>([]);

  const [productoSeleccionado, setProductoSeleccionado] =
    useState("");

  const [data, setData] = useState<
    ReporteProveedor[]
  >([]);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await api.get("/api/productos");

        setProductos(response.data);
      } catch (error) {
        console.error(
          "Error obteniendo productos:",
          error,
        );
      }
    };

    obtenerProductos();
  }, []);

  useEffect(() => {
    if (!productoSeleccionado) {
      setData([]);

      return;
    }

    const obtenerReporte = async () => {
      try {
        const response = await api.get(
          `/api/reportes/${productoSeleccionado}`,
        );

        setData(response.data);
      } catch (error) {
        console.error(
          "Error obteniendo reporte:",
          error,
        );

        setData([]);
      }
    };

    obtenerReporte();
  }, [productoSeleccionado, refresh]);

  const mejorProveedor = data[0];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-5">
        <Label>Producto</Label>

        <Select
          options={[
            {
              value: "",
              label: "Seleccione un producto",
            },

            ...productos.map((producto) => ({
              value: producto._id,
              label: producto.nombre,
            })),
          ]}
          defaultValue={
            productos
              .map((producto) => ({
                value: producto._id,
                label: producto.nombre,
              }))
              .find(
                (o) =>
                  o.value === productoSeleccionado,
              ) || null
          }
          onChange={(option) => {
            setProductoSeleccionado(option.value);

            setExpanded(false);
          }}
        />
      </div>

      {mejorProveedor && (
        <div
          onClick={() =>
            setExpanded(!expanded)
          }
          className="mb-5 p-4 border rounded-lg bg-blue-50 cursor-pointer hover:bg-blue-100 transition"
        >
          <h2 className="font-bold text-lg">
            🏆 Proveedor más económico
          </h2>

          <p className="mt-2">
            <strong>
              {mejorProveedor.nombreProveedor}
            </strong>
          </p>

          <p className="mt-1">
            Precio más barato:{" "}
            {formatCOP(
              mejorProveedor.precioMasBarato,
            )}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {expanded
              ? "Click para ocultar información"
              : "Click para ver más información"}
          </p>
        </div>
      )}

      {expanded && (
        <TableTools
          data={data}
          title="PROVEEDORES DEL PRODUCTO"
          fileName="reporte-proveedores.xlsx"
          columns={[
            {
              key: "nombreProveedor",
              label: "Proveedor",
            },
            {
              key: "correoProveedor",
              label: "Correo",
            },
            {
              key: "telefonoProveedor",
              label: "Teléfono",
            },
            {
              key: "precioMasBarato",
              label: "Precio Más Barato",
              render: (value: number) =>
                formatCOP(value),
            },
            {
              key: "promedioPrecio",
              label: "Promedio",
              render: (value: number) =>
                formatCOP(value),
            },
            {
              key: "totalCompras",
              label: "Total Compras",
            },
          ]}
        />
      )}
    </div>
  );
}
