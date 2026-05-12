import { useEffect, useState } from "react";
import api from "../../axios/axios";
import TableTools from "../../components/tables/BasicTables/TableTools";

interface Proveedor {
  nombre: string;
  correo: string;
  telefono: string;
}

interface InformeLevanteProps {
  refresh: number;
}

export default function InformeLevante({
  refresh,
}: InformeLevanteProps) {
  const [data, setData] = useState<Proveedor[]>([]);

  useEffect(() => {
    const obtenerProveedores = async () => {
      try {
        const response = await api.get("/api/proveedores");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerProveedores();
  }, [refresh]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <TableTools
        data={data}
        title="LISTADO PROVEEDORES"
        fileName="proveedores.xlsx"
        columns={[
          { key: "nombre", label: "Nombre" },
          { key: "correo", label: "Correo" },
          { key: "telefono", label: "Teléfono" },
        ]}
      />
    </div>
  );
}