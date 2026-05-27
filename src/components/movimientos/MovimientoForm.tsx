import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import MovimientoFields from "./MovimientoFields";

import {
    obtenerProductos,
    obtenerProveedores,
    crearCompra,
    crearVenta,
} from "./MovimientoActions";

import { useAuthStore } from "../../store/authStore";

export default function MovimientoForm() {

    const user = useAuthStore(
        (state) => state.user
    );

    const [tipo, setTipo] =
        useState<"compra" | "venta">(
            "compra"
        );

    const [productos, setProductos] =
        useState([]);

    const [proveedores, setProveedores] =
        useState([]);

    const [
        productoSeleccionado,
        setProductoSeleccionado
    ] = useState<any>(null);

    const [resetKey, setResetKey] =
        useState(0);

    const [loading, setLoading] =
        useState(false);

    const [form, setForm] =
        useState({
            id_producto: "",
            id_proveedor: "",
            cantidad: "",
            precio: "",
            fecha: new Date()
                .toLocaleDateString(
                    "en-CA"
                ),
        });

    useEffect(() => {

        cargarDatos();

    }, []);

    const cargarDatos =
        async () => {

            try {

                const [
                    productosData,
                    proveedoresData
                ] =
                    await Promise.all([
                        obtenerProductos(),
                        obtenerProveedores(),
                    ]);

                setProductos(
                    productosData
                );

                setProveedores(
                    proveedoresData
                );

            } catch {

                Swal.fire(
                    "Error",
                    "No se pudieron cargar datos",
                    "error"
                );
            }
        };

    const fechaActual =
        new Date()
            .toLocaleDateString(
                "en-CA"
            );

    const limpiarFormulario =
        () => {

            setForm({
                id_producto: "",
                id_proveedor: "",
                cantidad: "",
                precio: "",
                fecha:
                    fechaActual,
            });

            setProductoSeleccionado(
                null
            );

            setResetKey(
                (prev) =>
                    prev + 1
            );
        };

    const handleSubmit =
        async (
            e: React.FormEvent
        ) => {

            e.preventDefault();

            if (loading)
                return;

            setLoading(true);

            try {

                if (
                    !user?.id
                ) {

                    return Swal.fire(
                        "Warning",
                        "No hay usuario autenticado",
                        "warning"
                    );
                }

                if (
                    tipo ===
                    "compra"
                ) {

                    await crearCompra({
                        id_producto:
                            form.id_producto,

                        id_proveedor:
                            form.id_proveedor,

                        cantidad:
                            Number(
                                form.cantidad
                            ),

                        precio_compra:
                            Number(
                                form.precio
                            ),

                        costo_total:
                            Number(
                                form.cantidad
                            ) *
                            Number(
                                form.precio
                            ),

                        fecha:
                            form.fecha,
                    });

                    Swal.fire(
                        "Éxito",
                        "Compra registrada",
                        "success"
                    );

                } else {

                    await crearVenta({
                        id_producto:
                            form.id_producto,

                        id_usuario:
                            user.id,

                        cantidad:
                            Number(
                                form.cantidad
                            ),

                        precio_venta:
                            Number(
                                form.precio
                            ),

                        precio_total:
                            Number(
                                form.cantidad
                            ) *
                            Number(
                                form.precio
                            ),

                        fecha:
                            form.fecha,
                    });

                    Swal.fire(
                        "Éxito",
                        "Venta registrada",
                        "success"
                    );
                }

                limpiarFormulario();
                cargarDatos();

            } catch (
            error: any
            ) {

                Swal.fire(
                    "Error",
                    error
                        .response
                        ?.data
                        ?.message ||
                    "Error al guardar",
                    "error"
                );

            } finally {

                setLoading(false);
            }
        };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 shadow"
        >

            <h2 className="font-semibold mb-4">
                Movimientos
            </h2>

            <MovimientoFields
                tipo={tipo}
                form={form}
                productos={productos}
                proveedores={proveedores}
                productoSeleccionado={productoSeleccionado}
                resetKey={resetKey}
                setTipo={setTipo}
                setForm={setForm}
                setProductoSeleccionado={
                    setProductoSeleccionado
                }
                limpiarFormulario={limpiarFormulario}
            />

            <div className="flex justify-center mt-6">
                <button
                    type="submit"
                    disabled={
                        loading
                    }
                    className={`px-8 py-2 border-2 font-semibold rounded-lg transition
                        ${loading
                            ? "border-gray-400 text-gray-400 cursor-not-allowed"
                            : "border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
                        }`}
                >
                    {loading
                        ? "Guardando..."
                        : "Guardar"}
                </button>
            </div>
        </form>
    );
}