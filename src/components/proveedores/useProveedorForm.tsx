import { useState } from "react";
import api from "../../axios/axios";
import { ProveedorForm } from "../proveedores/types";
import Swal from "sweetalert2";

const INITIAL: ProveedorForm = {
  nombre: "",
  correo: "",
  telefono: "",
};

export function useProveedorForm(onSuccess?: () => void) {
  const [form, setForm] = useState<ProveedorForm>(INITIAL);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post("/api/proveedores", form);

      console.log("Proveedor creado:", res.data);

      Swal.fire({
        icon: "success",
        title: "Proveedor creado",
        text: "El proveedor fue guardado correctamente",
        confirmButtonColor: "#6366f1",
      });

      setForm(INITIAL);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      console.error(err);

      let message = "Error al guardar proveedor";

      if (typeof err === "object" && err !== null && "response" in err) {
        const error = err as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };

        message = error.response?.data?.message || message;
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
    handleChange,
    handleSubmit,
  };
}
