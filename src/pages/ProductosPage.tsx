import { useState } from "react";
import AlumnoFields from "../components/Productos/AlumnoFields";
import ProductosFooter from "../components/Productos/ProductosFooter";
import ProductosTable from "../components/Productos/ProductosTable";
import { useAlumnoForm } from "../components/Productos/useProductoForm";

export default function AlumnosPage() {
  const [refresh, setRefresh] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const {
    form,
    setForm,
    loading,
    handleChange,
    handleSubmit,
  } = useAlumnoForm(() => {
    setRefresh((prev) => prev + 1);
    setResetKey((prev) => prev + 1);
  });

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="font-semibold text-left mb-4">
          ALUMNOS
        </h2>

        <form onSubmit={handleSubmit}>
          <AlumnoFields
            form={form}
            onChange={handleChange}
            setForm={setForm}
            resetKey={resetKey}
          />

          <ProductosFooter loading={loading} />
        </form>
      </div>

      <div className="mt-6">
        <ProductosTable refresh={refresh} />
      </div>
    </div>
  );
}