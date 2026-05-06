import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";


export default function ProveedorFields() {
    const options = [
        { value: "marketing", label: "Marketing" },
        { value: "template", label: "Template" },
        { value: "development", label: "Development" },
    ];
    const handleSelectChange = (value: string) => {
        console.log("Selected value:", value);
    };
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <div>
                <Label>Código Proveedor</Label>
                <Input
                    name="codigoProveedor"
                    placeholder="Código"
                />
            </div>

            <div>
                <Label>Nombre Empresa</Label>
                <Input
                    name="nombreEmpresa"
                    placeholder="Nombre empresa"
                />
            </div>

            <div>
                <Label>Contacto</Label>
                <Input
                    name="contacto"

                    placeholder="Persona de contacto"
                />
            </div>
            <div>
                <Label htmlFor="input">Input</Label>
                <Input type="text" id="input" />
            </div>
            <div>
                <Label>Teléfono</Label>
                <Input
                    name="telefono"

                    placeholder="Teléfono"
                />
            </div>

            <div>
                <Label>Correo</Label>
                <Input
                    name="correo"
                    type="email"

                    placeholder="correo@email.com"
                />
            </div>

            <div>
                <Label>Ciudad</Label>
                <Input
                    name="ciudad"
                    placeholder="Ciudad"
                />
            </div>


            <div>
                <Label>Select Input</Label>
                <Select
                    options={options}
                    placeholder="Select an option"
                    onChange={handleSelectChange}
                    className="dark:bg-dark-900"
                />
            </div>
        </div>
    );
}