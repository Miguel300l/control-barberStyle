import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import TextArea from "../../components/form/input/TextArea";
import Select from "../form/Select";
import { ProductoForm } from "./types";

interface Props {
  form: ProductoForm;
  proveedores: any[];
  setForm: any;
  resetKey: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onDescriptionChange: (value: string) => void;
}

export default function ProductosFields({
  form,
  proveedores,
  resetKey,
  setForm,
  onChange,
  onDescriptionChange,
}: Props) {

  const proveedorOptions = proveedores.map((proveedor) => ({
    value: proveedor._id,
    label: proveedor.nombre,
  }));


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <Label>Nombre Producto</Label>
        <Input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={onChange}
          placeholder="Nombre producto"
          required
        />
      </div>

      <div>
        <Label>Código</Label>
        <Input
          type="text"
          name="codigo"
          value={form.codigo}
          onChange={onChange}
          placeholder="Código producto"
          required
        />
      </div>

      <div>
        <Label>Proveedor</Label>

        <Select
          key={`proveedor-${resetKey}`}
          options={proveedorOptions}
          placeholder="Buscar proveedor..."
          isSearchable
          required
          onChange={(option: any) =>
            setForm((prev: any) => ({
              ...prev,
              proveedor: option.value,
            }))
          }
        />
      </div>

      <div>
        <Label>Stock Mínimo</Label>
        <Input
          type="number"
          name="stockMinimo"
          value={form.stockMinimo}
          onChange={onChange}
          placeholder="Minimo Recomendado 5"
          min="1"
          required
        />
      </div>

      <div>
        <Label>Stock</Label>
        <Input
          type="number"
          name="stock"
          value={form.stock}
          onChange={onChange}
          placeholder="Existencias"
          min="1"
          required
        />
      </div>

      <div className="md:col-span-2 lg:col-span-3">
        <Label>Descripción</Label>

        <TextArea
          value={form.descripcion || ""}
          onChange={onDescriptionChange}
          rows={2}
          placeholder="Descripción producto"
          required
        />
      </div>
    </div>
  );
}
