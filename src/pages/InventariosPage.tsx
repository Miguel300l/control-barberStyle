import { useEffect, useState } from "react";
import InventarioTable from "../components/inventario/InventarioTable";
import Select from "../components/form/Select";
import Label from "../components/form/Label";

export default function InventariosPage() {
  const [refresh] = useState(false);

  const [filtros, setFiltros] = useState({
    desde: "",
    hasta: "",
    tipo: "ambos",
  });

  useEffect(() => {
    const hoy = new Date().toISOString().split("T")[0];

    setFiltros({
      desde: hoy,
      hasta: hoy,
      tipo: "ambos",
    });
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

  return (
    <div className="p-6 space-y-6">
      {/* TITULO */}
      <div>
        <h1 className="text-2xl font-bold">
          Inventario
        </h1>
      </div>

      {/* FILTROS */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-4 items-end">
        {/* DESDE */}
        <div>
          <Label>Desde</Label>

          <input
            type="date"
            value={filtros.desde}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                desde: e.target.value,
              })
            }
            className="border rounded-md px-3 py-2"
          />
        </div>

        {/* HASTA */}
        <div>
          <Label>Hasta</Label>

          <input
            type="date"
            value={filtros.hasta}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                hasta: e.target.value,
              })
            }
            className="border rounded-md px-3 py-2"
          />
        </div>

        {/* TIPO */}
        <div className="min-w-[220px]">
          <Label>Tipo</Label>

          <Select
            options={tipoOptions}
            defaultValue={tipoOptions[0]}
            onChange={(option: any) =>
              setFiltros({
                ...filtros,
                tipo: option.value,
              })
            }
          />
        </div>


      </div>

      {/* TABLA */}
      <InventarioTable
        refresh={refresh}
        filtros={filtros}
      />
    </div>
  );
}