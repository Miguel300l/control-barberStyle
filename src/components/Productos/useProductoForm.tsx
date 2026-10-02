import { useState } from "react";
import api from "../../axios/axios";
import Swal from "sweetalert2";
import { AlumnoForm } from "./AlumnoForm";

const INITIAL: AlumnoForm = {
  nombres: "",
  apellidos: "",
  tipoDocumento: "",
  documento: "",
  celular: "",
  edad: "",
  totalCurso: "",
  abono: "",
  fecha: new Date().toISOString().split("T")[0],
  saldoPendiente: "",
};

export function useAlumnoForm(onSuccess?: () => void) {
  const [form, setForm] = useState<AlumnoForm>(INITIAL);
  const [loading, setLoading] = useState(false);

  const [resetKey, setResetKey] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        nombres: form.nombres,
        apellidos: form.apellidos,
        tipoDocumento: form.tipoDocumento,
        documento: form.documento,
        celular: form.celular,
        edad: Number(form.edad),
        totalCurso: Number(form.totalCurso),
        abono: Number(form.abono),
        fecha: form.fecha,
      };

      const res = await api.post("/api/alumnos", payload);

      console.log("Alumno creado:", res.data);

      Swal.fire({
        icon: "success",
        title: "Alumno creado",
        text: "El alumno fue guardado correctamente",
        confirmButtonColor: "#6366f1",
      });

      setForm({
        ...INITIAL,
        fecha: new Date().toISOString().split("T")[0],
      });

      setResetKey((prev) => prev + 1);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      console.error(err);

      let message = "Error al guardar alumno";

      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err
      ) {
        const error = err as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };

        message =
          error.response?.data?.message || message;
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    setForm,
    handleChange,
    handleSubmit,
    resetKey,
  };
}