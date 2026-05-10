import { useEffect, useState } from "react";
import api from "../axios/axios";

import Input from "../../src/components/form/input/InputField";
import Label from "../../src/components/form/Label";
import Select from "../../src/components/form/Select";

interface Producto {
  _id: string;
  nombre: string;
  stock: number;
}

interface Proveedor {
  _id: string;
  nombre: string;
}

interface User {
  id: string;
  nombre?: string;
}
export default function MovimientosPage() {
  const [tipo, setTipo] = useState<"compra" | "venta">("compra");

  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);

  const stored = localStorage.getItem("user");
  const user: User | null = stored ? JSON.parse(stored) : null;

  const [form, setForm] = useState({
    id_producto: "",
    id_proveedor: "",
    cantidad: "",
    precio: "",
    fecha: new Date().toISOString().split("T")[0],
  });

  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    obtenerProductos();
    obtenerProveedores();
  }, []);

  const obtenerProductos = async () => {
    try {
      const res = await api.get("/api/productos");

      setProductos(res.data);

      return res.data;

    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const obtenerProveedores = async () => {
    try {
      const res = await api.get("/api/proveedores");
      setProveedores(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const limpiarFormulario = () => {
    setForm({
      id_producto: "",
      id_proveedor: "",
      cantidad: "",
      precio: "",
      fecha: new Date().toISOString().split("T")[0],
    });

    setProductoSeleccionado(null);
    setResetKey((prev) => prev + 1);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (
      (name === "cantidad" || name === "precio") &&
      Number(value) < 0
    ) {
      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (tipo === "compra") {
        await api.post("/api/compras", {
          id_producto: form.id_producto,
          id_proveedor: form.id_proveedor,
          cantidad: Number(form.cantidad),
          precio_compra: Number(form.precio),
          costo_total:
            Number(form.cantidad) * Number(form.precio),
          fecha: form.fecha,
        });

        alert("Compra registrada");
      } else {
        // validación de usuario
        if (!user?.id) {
          alert("No hay usuario logueado");
          return;
        }


        await api.post("/api/ventas", {
          id_producto: form.id_producto,
          id_usuario: user.id,
          cantidad: Number(form.cantidad),
          precio_venta: Number(form.precio),
          precio_total:
            Number(form.cantidad) * Number(form.precio),
          fecha: form.fecha,
        });

        alert("Venta registrada");
      }

      const productosActualizados = await obtenerProductos();

      const productoActualizado = productosActualizados.find(
        (p: Producto) => p._id === form.id_producto
      );

      setProductoSeleccionado(productoActualizado || null);
      limpiarFormulario();
    } catch (error) {
      console.error(error);
    }
  };

  const tipoOptions = [
    { value: "compra", label: "Compra" },
    { value: "venta", label: "Venta" },
  ];

  const productoOptions = productos.map((producto) => ({
    value: producto._id,
    label: producto.nombre,
  }));

  const proveedorOptions = proveedores.map((proveedor) => ({
    value: proveedor._id,
    label: proveedor.nombre,
  }));

  return (
    <div className="p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-dark-900 rounded-2xl p-6 shadow"
      >
        <h2 className="font-semibold text-left mb-4">
          Movimientos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {/* TIPO */}
          <div>
            <Label>Tipo Movimiento</Label>
            <Select
              options={tipoOptions}
              placeholder="Seleccione tipo"
              onChange={(option: any) => {
                setTipo(option.value as "compra" | "venta");
                limpiarFormulario();
              }}
              className="dark:bg-dark-900"
            />
          </div>

          {/* PRODUCTO */}
          <div>
            <Label>Producto</Label>
            <Select
              key={`producto-${resetKey}`}
              options={productoOptions}
              placeholder="Buscar producto..."
              isSearchable={true}
              onChange={(option: any) => {
                const producto = productos.find(
                  (p) => p._id === option.value
                );

                setProductoSeleccionado(producto || null);

                setForm((prev) => ({
                  ...prev,
                  id_producto: option.value,
                }));
              }}
              className="dark:bg-dark-900"
            />
          </div>

          {/* STOCK */}
          <div>
            <Label>Stock Actual</Label>

            <Input
              type="text"
              value={
                productoSeleccionado
                  ? productoSeleccionado.stock.toLocaleString("es-CO")
                  : ""
              }
              disabled
            />
          </div>

          {/* PROVEEDOR */}
          {tipo === "compra" && (
            <div>
              <Label>Proveedor</Label>
              <Select
                key={`proveedor-${resetKey}`}
                options={proveedorOptions}
                placeholder="Buscar proveedor..."
                isSearchable={true}
                onChange={(option: any) =>
                  setForm((prev) => ({
                    ...prev,
                    id_proveedor: option.value,
                  }))
                }
                className="dark:bg-dark-900"
              />
            </div>
          )}

          {/* FECHA */}
          <div>
            <Label>Fecha</Label>
            <Input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={onChange}
              required
            />
          </div>

          {/* CANTIDAD */}
          <div>
            <Label>Cantidad</Label>
            <Input
              type="number"
              name="cantidad"
              value={form.cantidad}
              onChange={onChange}
              min="1"
              required
            />
          </div>

          {/* PRECIO */}
          <div>
            <Label>
              {tipo === "compra"
                ? "Precio Compra"
                : "Precio Venta"}
            </Label>
            <Input
              type="text"
              name="precio"
              value={
                form.precio
                  ? Number(form.precio).toLocaleString("es-CO")
                  : ""
              }
              onChange={(e) => {
                const value = e.target.value.replace(/\./g, "");
                if (!isNaN(Number(value))) {
                  setForm({
                    ...form,
                    precio: value,
                  });
                }
              }}
              required
            />
          </div>

          {/* TOTAL */}
          <div>
            <Label>
              {tipo === "compra"
                ? "Costo Total"
                : "Precio Total"}
            </Label>

            <Input
              type="text"
              value={(
                Number(form.cantidad || 0) *
                Number(form.precio || 0)
              ).toLocaleString("es-CO")}
              disabled
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-8 py-2 border-2 border-blue-700 text-blue-700 font-semibold rounded-lg"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}