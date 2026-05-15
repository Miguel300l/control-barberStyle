import { useEffect, useState } from "react";
import api from "../../axios/axios";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
} from "../../icons";

import Badge from "../ui/badge/Badge";

interface ProductoMetric {
  _id: string;
  totalVendido: number;
  producto: {
    nombre: string;
    codigo: string;
    stock: number;
  };
}

interface MetricsData {
  masVendido: ProductoMetric;
  menosVendido: ProductoMetric;
}

export default function EcommerceMetrics() {
  const [data, setData] = useState<MetricsData | null>(null);

  useEffect(() => {
    const obtenerMetricas = async () => {
      try {
        const response = await api.get(
          "/api/ventas/productos-mas-vendidos"
        );

        setData(response.data);
      } catch (error) {
        console.error(
          "Error obteniendo métricas:",
          error
        );
      }
    };

    obtenerMetricas();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">

      {/* MÁS VENDIDO */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">

        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
          <BoxIconLine className="text-green-600 size-6" />
        </div>

        <div className="flex items-end justify-between mt-5">

          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Producto más vendido
            </span>

            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {data?.masVendido?.producto?.nombre ||
                "Sin datos"}
            </h4>

            <p className="text-sm text-gray-500 mt-1">
              Código:{" "}
              {data?.masVendido?.producto?.codigo}
            </p>
          </div>

          <Badge color="success">
            <ArrowUpIcon />
            {data?.masVendido?.totalVendido || 0}
          </Badge>

        </div>
      </div>

      {/* MENOS VENDIDO */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">

        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl">
          <BoxIconLine className="text-red-600 size-6" />
        </div>

        <div className="flex items-end justify-between mt-5">

          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Producto menos vendido
            </span>

            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {data?.menosVendido?.producto?.nombre ||
                "Sin datos"}
            </h4>

            <p className="text-sm text-gray-500 mt-1">
              Código:{" "}
              {data?.menosVendido?.producto?.codigo}
            </p>
          </div>

          <Badge color="error">
            <ArrowDownIcon />
            {data?.menosVendido?.totalVendido || 0}
          </Badge>

        </div>
      </div>

    </div>
  );
}
