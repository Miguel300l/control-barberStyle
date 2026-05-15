import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import {
  useEffect,
  useState,
} from "react";

import api from "../../axios/axios";

export default function MonthlyTarget() {

  const [masComprado, setMasComprado] =
    useState<any>(null);

  const [menosComprado, setMenosComprado] =
    useState<any>(null);

  useEffect(() => {

    const obtenerProductos =
      async () => {

        try {

          const response =
            await api.get(
              "/api/compras/productos-mas-comprados"
            );

          setMasComprado(
            response.data.masComprado
          );

          setMenosComprado(
            response.data.menosComprado
          );

        } catch (error) {

          console.error(
            "Error obteniendo productos:",
            error
          );
        }
      };

    obtenerProductos();

  }, []);

  const totalMasComprado =
    masComprado?.totalComprado || 0;

  const totalMenosComprado =
    menosComprado?.totalComprado || 0;

  const porcentaje =
    totalMasComprado > 0
      ? (
        (totalMenosComprado /
          totalMasComprado) *
        100
      ).toFixed(0)
      : 0;

  const series = [
    Number(porcentaje),
  ];

  const options: ApexOptions = {

    colors: ["#465FFF"],

    chart: {
      fontFamily:
        "Outfit, sans-serif",

      type: "radialBar",

      height: 330,

      sparkline: {
        enabled: true,
      },
    },

    plotOptions: {
      radialBar: {

        startAngle: -85,

        endAngle: 85,

        hollow: {
          size: "80%",
        },

        track: {
          background:
            "#E4E7EC",

          strokeWidth:
            "100%",

          margin: 5,
        },

        dataLabels: {

          name: {
            show: false,
          },

          value: {
            fontSize: "36px",

            fontWeight: "600",

            offsetY: -40,

            color: "#1D2939",

            formatter:
              function (val) {

                return (
                  val + "%"
                );
              },
          },
        },
      },
    },

    fill: {
      type: "solid",

      colors: ["#465FFF"],
    },

    stroke: {
      lineCap: "round",
    },

    labels: ["Compras"],
  };

  return (

    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">

      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">

        <div className="flex justify-between">

          <div>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Productos Comprados
            </h3>

            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Productos con más y menos compras
            </p>

          </div>

        </div>

        <div className="relative">

          <div
            className="max-h-[330px]"
            id="chartDarkStyle"
          >

            <Chart
              options={options}
              series={series}
              type="radialBar"
              height={330}
            />
          </div>

          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-600">

            {porcentaje}% relación

          </span>

        </div>
        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">

          Comparación entre el producto más comprado y el menos comprado.

        </p>

      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">

        {/* Más comprado */}
        <div>

          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Más Comprado
          </p>

          <p className="text-center text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">

            {
              masComprado
                ?.producto
                ?.nombre ||
              "Sin datos"
            }

          </p>

          <span className="block text-center text-sm text-green-600 font-medium">

            {
              masComprado
                ?.totalComprado || 0
            } unidades

          </span>

        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        {/* Menos comprado */}
        <div>

          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Menos Comprado
          </p>

          <p className="text-center text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">

            {
              menosComprado
                ?.producto
                ?.nombre ||
              "Sin datos"
            }

          </p>

          <span className="block text-center text-sm text-red-500 font-medium">

            {
              menosComprado
                ?.totalComprado || 0
            } unidades

          </span>

        </div>

      </div>

    </div>
  );
}
