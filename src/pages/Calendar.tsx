import ProveedorFields from "../components/proveedores/ProveedorFields";
import ProveedorFooter from "../components/proveedores/ProveedorFooter";
import InformeLevante from "../components/proveedores/InformeLevante";
import { useProveedorForm } from "../components/proveedores/useProveedorForm";

export default function ProveedoresForm() {
  const {
    loading,
    error,
    success,
    handleSubmit,
  } = useProveedorForm();
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">

        <h2 className="font-semibold text-left mb-4">
          PROVEEDORES
        </h2>


        <form onSubmit={handleSubmit}>

          <ProveedorFields />

          <ProveedorFooter
            loading={loading}
            success={success}
            error={error}
          />

        </form>
      </div>

      <div style={{ marginTop: "24px" }}>
        <InformeLevante />
      </div>

    </div>
  );
}