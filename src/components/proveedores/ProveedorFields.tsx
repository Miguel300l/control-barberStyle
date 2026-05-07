import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";

interface Props {
    form: {
        nombre: string;
        correo: string;
        telefono: string;
    };

    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

export default function ProveedorFields({
    form,
    onChange,
}: Props) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* NOMBRE */}
            <div>
                <Label>Nombre Empresa</Label>
                <Input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={onChange}
                    placeholder="Nombre empresa"
                    required
                />
            </div>

            {/* CORREO */}
            <div>
                <Label>Correo</Label>
                <Input
                    type="email"
                    name="correo"
                    value={form.correo}
                    onChange={onChange}
                    placeholder="correo@email.com"
                    required
                />
            </div>

            {/* TELEFONO */}
            <div>
                <Label>Teléfono</Label>
                <Input
                    type="number"
                    name="telefono"
                    value={form.telefono}
                    onChange={onChange}
                    placeholder="Teléfono"
                    required
                />
            </div>

        </div>
    );
}