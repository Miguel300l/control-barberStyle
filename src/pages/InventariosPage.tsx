import {
  useEffect,
  useState,
} from "react";

import InventarioTable from "../components/inventario/InventarioTable";

import Select from "../components/form/Select";

import Label from "../components/form/Label";

import {
  obtenerProductos,
} from "../components/movimientos/MovimientoActions";

export default function InventariosPage() {

  const [refresh] =
    useState(false);

  const [productos, setProductos] =
    useState<any[]>([]);

  const [filtros, setFiltros] =
    useState({

      desde: "",

      hasta: "",

      tipo: "ambos",

      id_producto: "",

    });

  useEffect(() => {

    const hoy =
      new Date()
        .toISOString()
        .split("T")[0];

    setFiltros({

      desde: hoy,

      hasta: hoy,

      tipo: "ambos",

      id_producto: "",

    });

  }, []);

  useEffect(() => {

    const cargarProductos =
      async () => {

        try {

          const data =
            await obtenerProductos();

          setProductos(data);

        } catch (error) {

          console.error(
            "Error cargando productos:",
            error
          );
        }
      };

    cargarProductos();

  }, []);

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

  const productoOptions =
    productos.map(
      (producto) => ({

        value:
          producto._id,

        label:
          producto.nombre,

      })
    );

  return (

    <div className="p-6 space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Reportes
        </h1>

      </div>

      <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-4 items-end">

        {/* DESDE */}
        <div>

          <Label>
            Desde
          </Label>

          <input
            type="date"
            value={filtros.desde}
            onChange={(e) =>
              setFiltros({

                ...filtros,

                desde:
                  e.target.value,

              })
            }
            className="border rounded-md px-3 py-2"
          />

        </div>

        {/* HASTA */}
        <div>

          <Label>
            Hasta
          </Label>

          <input
            type="date"
            value={filtros.hasta}
            onChange={(e) =>
              setFiltros({

                ...filtros,

                hasta:
                  e.target.value,

              })
            }
            className="border rounded-md px-3 py-2"
          />

        </div>

        {/* PRODUCTO */}
        <div className="min-w-[250px]">

          <Label>
            Producto
          </Label>

          <Select
            options={
              productoOptions
            }
            placeholder="Seleccione producto"
            isSearchable
            onChange={(
              option: any
            ) =>
              setFiltros({

                ...filtros,

                id_producto:
                  option?.value || "",

              })
            }
          />

        </div>

        {/* TIPO */}
        <div className="min-w-[220px]">

          <Label>
            Tipo
          </Label>

          <Select
            options={
              tipoOptions
            }
            defaultValue={
              tipoOptions[0]
            }
            onChange={(
              option: any
            ) =>
              setFiltros({

                ...filtros,

                tipo:
                  option.value,

              })
            }
          />

        </div>

      </div>

      <InventarioTable
        refresh={refresh}
        filtros={filtros}
      />

    </div>
  );
}