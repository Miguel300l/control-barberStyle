import { useState } from "react";
import ProductosFields from "../components/Productos/ProductosFields";
import ProductosFooter from "../components/Productos/ProductosFooter";
import ProductosTable from "../components/Productos/ProductosTable";
import { useProductoForm } from "../components/Productos/useProductoForm";

export default function ProductosPage() {
  const [refresh, setRefresh] = useState(0);

  const { form, loading, handleChange, handleDescriptionChange, handleSubmit } =
    useProductoForm(() => {
      setRefresh((prev) => prev + 1);
    });

  return (
    <div className="p-6 space-y-6">
      {/* FORM */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="font-semibold text-left mb-4">PRODUCTOS</h2>

        <form onSubmit={handleSubmit}>
          <ProductosFields
            form={form}
            onChange={handleChange}
            onDescriptionChange={handleDescriptionChange}
          />

          <ProductosFooter loading={loading} />
        </form>
      </div>

      {/* TABLA */}
      <div className="mt-6">
        <ProductosTable refresh={refresh} />
      </div>
    </div>
  );
}
