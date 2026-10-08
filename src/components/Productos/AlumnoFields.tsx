import { useEffect, useState } from "react";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import { AlumnoForm } from "./AlumnoForm";
import api from "../../axios/axios";

interface Props {
  form: AlumnoForm;
  setForm: React.Dispatch<React.SetStateAction<AlumnoForm>>;
  resetKey: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AlumnoFields({
  form,
  setForm,
  resetKey,
  onChange,
}: Props) {
  const [alumnoEncontrado, setAlumnoEncontrado] = useState(false);

  useEffect(() => {
    setAlumnoEncontrado(false);
  }, [resetKey]);

  const tipoDocumentoOptions = [
    {
      value: "Cédula",
      label: "Cédula",
    },
    {
      value: "Tarjeta de identidad",
      label: "Tarjeta de identidad",
    },
  ];

  const formatearMiles = (valor: string | number) => {
    if (valor === "" || valor === null || valor === undefined) {
      return "";
    }

    const numero = String(valor).replace(/\D/g, "");

    if (!numero) {
      return "";
    }

    return Number(numero).toLocaleString("es-CO");
  };

  const handleMontoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    const numero = value.replace(/\D/g, "");

    setForm((prev) => ({
      ...prev,
      [name]: numero,
    }));
  };

  const buscarAlumno = async () => {
    if (!form.documento.trim()) return;

    try {
      const response = await api.get(
        `/api/alumnos/documento/${form.documento.trim()}`
      );

      const alumno = response.data;

      setForm((prev) => ({
        ...prev,
        nombres: alumno.nombres,
        apellidos: alumno.apellidos,
        tipoDocumento: alumno.tipoDocumento,
        documento: alumno.documento,
        celular: alumno.celular,
        edad: String(alumno.edad),
        fecha: alumno.fecha
          ? new Date(alumno.fecha).toISOString().slice(0, 10)
          : "",
        totalCurso: String(alumno.totalCurso),

        abono: "",

        saldoPendiente: String(alumno.saldoPendiente),
      }));

      setAlumnoEncontrado(true);
    } catch (error) {
      console.error("Error al buscar alumno:", error);

      setAlumnoEncontrado(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Nombres */}
      <div>
        <Label>Nombres</Label>

        <Input
          type="text"
          name="nombres"
          value={form.nombres}
          onChange={onChange}
          placeholder="Nombres del alumno"
          disabled={alumnoEncontrado}
          required
        />
      </div>

      {/* Apellidos */}
      <div>
        <Label>Apellidos</Label>

        <Input
          type="text"
          name="apellidos"
          value={form.apellidos}
          onChange={onChange}
          placeholder="Apellidos del alumno"
          disabled={alumnoEncontrado}
          required
        />
      </div>

      {/* Tipo de documento */}
      <div>
        <Label>Tipo de documento</Label>

        <Select
          key={`tipo-documento-${resetKey}`}
          options={tipoDocumentoOptions}
          placeholder="Seleccione tipo de documento"
          isSearchable
          required
          value={
            tipoDocumentoOptions.find(
              (option) => option.value === form.tipoDocumento
            ) ?? null
          }
          onChange={(value) => {
            setForm((prev) => ({
              ...prev,
              tipoDocumento: value,
            }));
          }}
          disabled={alumnoEncontrado}
        />
      </div>

      {/* Documento */}
      <div>
        <Label>Número de documento</Label>

        <Input
          type="number"
          name="documento"
          value={form.documento}
          onChange={onChange}
          onBlur={buscarAlumno}
          placeholder="Número de documento"
          disabled={alumnoEncontrado}
          required
        />
      </div>

      {/* Celular */}
      <div>
        <Label>Celular</Label>

        <Input
          type="number"
          name="celular"
          value={form.celular}
          onChange={onChange}
          placeholder="Número de celular"
          disabled={alumnoEncontrado}
          required
        />
      </div>

      {/* Edad */}
      <div>
        <Label>Edad</Label>

        <Input
          type="number"
          name="edad"
          value={form.edad}
          onChange={onChange}
          placeholder="Edad"
          min="1"
          disabled={alumnoEncontrado}
          required
        />
      </div>

      {/* Fecha */}
      <div>
        <Label>Fecha</Label>

        <Input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={onChange}
          disabled={alumnoEncontrado}
          required
        />
      </div>

      {/* Total del curso */}
      <div>
        <Label>Total del curso</Label>

        <Input
          type="text"
          inputMode="numeric"
          name="totalCurso"
          value={formatearMiles(form.totalCurso)}
          onChange={handleMontoChange}
          placeholder="Valor total del curso"
          disabled={alumnoEncontrado}
          required
        />
      </div>

      {/* Abono */}
      <div>
        <Label>Abono</Label>

        <Input
          type="text"
          inputMode="numeric"
          name="abono"
          value={formatearMiles(form.abono)}
          onChange={handleMontoChange}
          placeholder={
            alumnoEncontrado
              ? "Ingrese el nuevo abono"
              : "Valor del abono"
          }
          required
        />
      </div>

      {/* Saldo pendiente */}
      {alumnoEncontrado && (
        <div>
          <Label>Saldo pendiente</Label>

          <Input
            type="text"
            inputMode="numeric"
            name="saldoPendiente"
            value={formatearMiles(form.saldoPendiente ?? "")}
            placeholder="Saldo pendiente"
            min="0"
            readOnly
            disabled
          />
        </div>
      )}
    </div>
  );
}