import { useState } from "react";
import api from "../../axios/axios";
import Swal from "sweetalert2";
import { ProductoForm } from "./types";

const INITIAL: ProductoForm = {
  nombre: "",
  codigo: "",
  descripcion: "",
  precioVenta: "",
  stockMinimo: "",
};

export function useProductoForm(onSuccess?: () => void) {
  const [form, setForm] = useState<ProductoForm>(INITIAL);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev: ProductoForm) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value: string) => {
    setForm((prev: ProductoForm) => ({
      ...prev,
      descripcion: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        ...form,
        precioVenta: Number(form.precioVenta),
        stockMinimo: Number(form.stockMinimo),
      };

      const res = await api.post("/api/productos", payload);

      console.log("Producto creado:", res.data);

      Swal.fire({
        icon: "success",
        title: "Producto creado",
        text: "El producto fue guardado correctamente",
        confirmButtonColor: "#6366f1",
      });

      setForm(INITIAL);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      console.error(err);

      let message = "Error al guardar producto";

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
    handleDescriptionChange,
    handleSubmit,
  };
}
