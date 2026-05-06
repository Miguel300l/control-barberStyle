import { useState } from "react";
import api from "../../axios/axios";
import { ProveedorForm } from "../proveedores/types";

const INITIAL: ProveedorForm = {
    nombre: "",
    correo: "",
    telefono: "",
};

export function useProveedorForm() {
    const [form, setForm] = useState<ProveedorForm>(INITIAL);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError(null);
        setSuccess(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await api.post("/api/proveedores", form);

            console.log("Proveedor creado:", res.data);

            setSuccess(true);
            setForm(INITIAL);
        } catch (err: any) {
            console.error(err);
            setError(
                err?.response?.data?.message ||
                "Error al guardar proveedor"
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
    };
}