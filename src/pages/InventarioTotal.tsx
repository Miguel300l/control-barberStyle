import { useState } from "react";
import InventarioTable from "../components/InventarioTotal/InventarioTotalTable";

export default function InventarioTotal() {
    const [refresh] = useState(0);
    return (
        <div className="p-6 space-y-6">
            {/* TABLA */}
            <div className="mt-6">
                <InventarioTable refresh={refresh} />
            </div>
        </div>
    );
}