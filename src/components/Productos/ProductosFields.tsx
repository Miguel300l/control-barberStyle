import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import TextArea from "../../components/form/input/TextArea";
import { ProductoForm } from "./types";

interface Props {
  form: ProductoForm;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onDescriptionChange: (value: string) => void;
}

export default function ProductosFields({
  form,
  onChange,
  onDescriptionChange,
}: Props) {
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
        <Label>Precio Venta</Label>
        <Input
          type="number"
          name="precioVenta"
          value={form.precioVenta}
          onChange={onChange}
          placeholder="0.00"
          required
        />
      </div>

      <div>
        <Label>Stock Mínimo</Label>
        <Input
          type="number"
          name="stockMinimo"
          value={form.stockMinimo}
          onChange={onChange}
          placeholder="5"
        />
      </div>

      <div className="md:col-span-2 lg:col-span-3">
        <Label>Descripción</Label>

        <TextArea
          value={form.descripcion || ""}
          onChange={onDescriptionChange}
          rows={4}
          placeholder="Descripción producto"
        />
      </div>
    </div>
  );
}
