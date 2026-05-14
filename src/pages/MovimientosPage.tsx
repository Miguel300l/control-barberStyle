import { useState } from "react";
import MovimientoForm from "../components/movimientos/MovimientoForm";
import MovimientosTable from "../components/movimientos/MovimientosTable";

export default function MovimientosPage() {

  const [refresh] = useState(0);

  return (
    <div className="p-6 space-y-6">

      {/* FORMULARIO */}
      <div className="p-6">
        <MovimientoForm />
      </div>

      {/* TABLA */}
      <div className="mt-6">
        <MovimientosTable refresh={refresh} />
      </div>

    </div>
  );
}