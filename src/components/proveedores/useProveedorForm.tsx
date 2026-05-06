import { useState } from "react";
import { ProveedorForm } from "../proveedores/types";

const INITIAL: ProveedorForm = {
    codigoProveedor: "",
    nombreEmpresa: "",
    ruc: "",
    contacto: "",
    telefono: "",
    correo: "",
    direccion: "",
    ciudad: "",
    pais: "",
    tipoProveedor: "",
    terminosPago: "",
    observacion: "",
};

export function useProveedorForm() {
    const [form, setForm] = useState<ProveedorForm>(INITIAL);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<any>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError(null);
        setSuccess(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch("/api/proveedores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Error al guardar");

            setSuccess(true);
            setForm(INITIAL);
        } catch (err: any) {
            setError(err.message);
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