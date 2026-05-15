import {
  useEffect,
  useRef,
  useState,
} from "react";

import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import flatpickr from "flatpickr";
import api from "../../axios/axios";

export default function StatisticsChart() {

  const datePickerRef =
    useRef<HTMLInputElement>(null);

  const [ventas, setVentas] =
    useState<number[]>([]);

  const [compras, setCompras] =
    useState<number[]>([]);

  const [year] =
    useState(
      new Date().getFullYear()
    );

  useEffect(() => {

    if (!datePickerRef.current)
      return;

    const today = new Date();

    const sevenDaysAgo =
      new Date();

    sevenDaysAgo.setDate(
      today.getDate() - 6
    );

    const fp = flatpickr(
      datePickerRef.current,
      {
        mode: "range",

        static: true,

        monthSelectorType:
          "static",

        dateFormat: "M d",

        defaultDate: [
          sevenDaysAgo,
          today,
        ],

        clickOpens: true,

        prevArrow:
          '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',

        nextArrow:
          '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      }
    );

    return () => {

      if (!Array.isArray(fp)) {
        fp.destroy();
      }
    };

  }, []);

  useEffect(() => {

    const obtenerDatos =
      async () => {

        try {

          const response =
            await api.get(
              `/api/ventas/estadisticas-mensuales?year=${year}`
            );

          setVentas(
            response.data.ventas
          );

          setCompras(
            response.data.compras
          );

        } catch (error) {

          console.error(
            "Error obteniendo estadísticas:",
            error
          );
        }
      };

    obtenerDatos();

  }, [year]);

  const options: ApexOptions = {

    legend: {
      show: true,

      position: "top",

      horizontalAlign:
        "left",
    },

    colors: [
      "#F4C7C3",
      "#465FFF",
    ],

    chart: {
      fontFamily:
        "Outfit, sans-serif",

      height: 310,

      type: "area",

      toolbar: {
        show: false,
      },
    },

    stroke: {
      curve: "smooth",

      width: [3, 3],
    },

    fill: {
      type: "gradient",

      gradient: {
        opacityFrom: 0.4,

        opacityTo: 0.05,
      },
    },

    markers: {
      size: 4,

      strokeColors: "#fff",

      strokeWidth: 2,

      hover: {
        size: 7,
      },
    },

    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },

      yaxis: {
        lines: {
          show: true,
        },
      },
    },

    dataLabels: {
      enabled: false,
    },

    tooltip: {
      enabled: true,
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

    yaxis: {
      labels: {
        style: {
          fontSize: "12px",

          colors: [
            "#6B7280",
          ],
        },
      },
    },
  };

  const series = [

    {
      name: "Ventas",

      data: ventas,
    },

    {
      name: "Compras",

      data: compras,
    },

  ];

  return (

    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">

      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">

        <div>

          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Estadísticas Mensuales
          </h3>

          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Compras y ventas del año {year}
          </p>

        </div>

        <div className="flex items-center gap-3 sm:justify-end">

          <div className="relative inline-flex items-center">



          </div>

        </div>

      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">

        <div className="min-w-[1000px] xl:min-w-full">

          <Chart
            options={options}
            series={series}
            type="area"
            height={310}
          />

        </div>

      </div>

    </div>
  );
}
