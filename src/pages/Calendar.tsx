import ProveedorFields from "../components/proveedores/ProveedorFields";
import ProveedorFooter from "../components/proveedores/ProveedorFooter";
import InformeLevante from "../components/proveedores/InformeLevante";
import { useProveedorForm } from "../components/proveedores/useProveedorForm";

export default function ProveedoresForm() {
  const {
    form,
    loading,
    handleChange,
    handleSubmit,
  } = useProveedorForm();

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">

        <h2 className="font-semibold text-left mb-4">
          PROVEEDORES
        </h2>

        <form onSubmit={handleSubmit}>

          <ProveedorFields
            form={form}
            onChange={handleChange}
          />

          <ProveedorFooter
            loading={loading}
          />

        </form>
      </div>

      <div className="mt-6">
        <InformeLevante />
      </div>

    </div>
  );
}