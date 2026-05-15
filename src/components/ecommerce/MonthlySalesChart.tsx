import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import {
  useEffect,
  useState,
} from "react";

import api from "../../axios/axios";

export default function MonthlySalesChart() {

  const [ventas, setVentas] =
    useState<number[]>([]);

  const [year] =
    useState(
      new Date().getFullYear()
    );

  useEffect(() => {

    const obtenerVentas =
      async () => {

        try {

          const response =
            await api.get(
              `/api/ventas/ventas-por-mes?year=${year}`
            );

          setVentas(
            response.data.ventas
          );

        } catch (error) {

          console.error(
            "Error obteniendo ventas:",
            error
          );
        }
      };

    obtenerVentas();

  }, [year]);

  const options: ApexOptions = {

    colors: ["#465fff"],

    chart: {
      fontFamily:
        "Outfit, sans-serif",

      type: "bar",

      height: 350,

      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication:
          "end",
      },
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },

    xaxis: {
      categories: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ],

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },
    },

    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (
          val: number
        ) => `${val}`,
      },
    },
  };
  const series = [
    {
      name:
        "Productos vendidos",

      data: ventas,
    },
  ];

  return (

    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">

      <div className="flex items-center justify-between">

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Ventas por Mes
          </h3>

          <p className="text-sm text-gray-500">
            Año {year}
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">

          <Chart
            options={options}
            series={series}
            type="bar"
            height={350}
          />

        </div>
      </div>
    </div>
  );
}
