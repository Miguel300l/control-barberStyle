import { useEffect, useState } from "react";
import api from "../../axios/axios";
import { Alumno } from "./AlumnoForm";
import TableTools from "../tables/BasicTables/TableTools";

interface AlumnoTableProps {
  refresh: number;
}

export default function AlumnoTable({ refresh }: AlumnoTableProps) {
  const [data, setData] = useState<Alumno[]>([]);

  useEffect(() => {
    const obtenerAlumnos = async () => {
      try {
        const response = await api.get("/api/alumnos");

        const alumnosFormateados = response.data.map((alumno: Alumno) => ({
          ...alumno,
          fecha: alumno.fecha
            ? new Date(alumno.fecha).toISOString().split("T")[0]
            : "",
        }));

        setData(alumnosFormateados);
      } catch (error) {
        console.error("Error al obtener alumnos:", error);
      }
    };

    obtenerAlumnos();
  }, [refresh]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <TableTools
        data={data}
        title="LISTADO DE ALUMNOS"
        fileName="alumnos.xlsx"
        columns={[
          {
            key: "nombres",
            label: "Nombres",
          },
          {
            key: "apellidos",
            label: "Apellidos",
          },
          {
            key: "tipoDocumento",
            label: "Tipo de documento",
          },
          {
            key: "documento",
            label: "Documento",
          },
          {
            key: "celular",
            label: "Celular",
          },
          {
            key: "edad",
            label: "Edad",
          },
          {
            key: "abono",
            label: "Abono",
            render: (value: number) =>
              Number(value).toLocaleString("es-CO"),
          },
          {
            key: "fecha",
            label: "Fecha",
          },
          {
            key: "saldoPendiente",
            label: "Saldo pendiente",
            render: (value: number) =>
              Number(value).toLocaleString("es-CO"),
          },
        ]}
      />
    </div>
  );
}