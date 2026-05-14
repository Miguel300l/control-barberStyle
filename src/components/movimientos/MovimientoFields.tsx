import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";

interface Props {
    tipo: "compra" | "venta";
    form: any;
    productos: any[];
    proveedores: any[];
    productoSeleccionado: any;
    resetKey: number;
    setTipo: any;
    setForm: any;
    setProductoSeleccionado: any;
    limpiarFormulario: () => void;
}

export default function MovimientoFields({
    tipo,
    form,
    productos,
    productoSeleccionado,
    resetKey,
    setTipo,
    setForm,
    setProductoSeleccionado,
    limpiarFormulario,
}: Props) {

    const tipoOptions = [
        { value: "compra", label: "Compra" },
        { value: "venta", label: "Venta" },
    ];

    const productoOptions = productos.map((producto) => ({
        value: producto._id,
        label: producto.nombre,
    }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {/* TIPO */}
            <div>
                <Label>Tipo Movimiento</Label>

                <Select
                    options={tipoOptions}
                    placeholder="Seleccione tipo"
                    onChange={(option: any) => {
                        setTipo(option.value);
                        limpiarFormulario();
                    }}
                />
            </div>

            {/* PRODUCTO */}
            <div>
                <Label>Producto</Label>

                <Select
                    key={`producto-${resetKey}`}
                    options={productoOptions}
                    placeholder="Seleccione producto"
                    isSearchable
                    onChange={(option: any) => {

                        const producto = productos.find(
                            (p) => p._id === option.value
                        );

                        setProductoSeleccionado(producto || null);

                        setForm((prev: any) => ({
                            ...prev,
                            id_producto: option.value,
                            id_proveedor: producto?.proveedor?._id || "",
                        }));
                    }}
                />
            </div>

            {/* STOCK */}
            <div>
                <Label>Stock Actual</Label>

                <Input
                    type="text"
                    value={
                        productoSeleccionado?.stock != null
                            ? Number(productoSeleccionado.stock).toLocaleString("es-CO")
                            : "0"
                    }
                    disabled
                />
            </div>

            {/* PROVEEDOR */}
            {tipo === "compra" && (
                <div>
                    <Label>Proveedor</Label>

                    <Input
                        type="text"
                        value={
                            productoSeleccionado?.proveedor?.nombre || "Sin proveedor"
                        }
                        disabled
                    />
                </div>
            )}

            {/* PROMEDIO COMPRA */}
            {tipo === "venta" && (
                <div>
                    <Label>Promedio Compra</Label>

                    <Input
                        type="text"
                        value={
                            productoSeleccionado?.precio_compra_promedio != null
                                ? Number(
                                    productoSeleccionado.precio_compra_promedio
                                ).toLocaleString("es-CO")
                                : "0"
                        }
                        disabled
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
                    onChange={(e: any) =>
                        setForm({
                            ...form,
                            fecha: e.target.value,
                        })
                    }
                />
            </div>

            {/* CANTIDAD */}
            <div>
                <Label>Cantidad</Label>

                <Input
                    type="number"
                    name="cantidad"
                    value={form.cantidad}
                    onChange={(e: any) =>
                        setForm({
                            ...form,
                            cantidad: e.target.value,
                        })
                    }
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
                    value={
                        form.precio
                            ? Number(form.precio).toLocaleString("es-CO")
                            : ""
                    }
                    onChange={(e: any) => {

                        const value =
                            e.target.value.replace(/\./g, "");

                        if (!isNaN(Number(value))) {
                            setForm({
                                ...form,
                                precio: value,
                            });
                        }
                    }}
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
    );
}