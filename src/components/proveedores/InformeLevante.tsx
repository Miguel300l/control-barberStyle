import { useState, useMemo } from "react";
import * as XLSX from "xlsx";

interface Row {
    numeroSemana: number;
    fechaPorSemana: string;
    mortalidad: number;
    seleccion: number;
    ventas: number;
    productos: string;
    costoUltimo: number;
}

const SAMPLE_DATA: Row[] = [
    { numeroSemana: 1, fechaPorSemana: "2025-07-24", mortalidad: 1, seleccion: 1, ventas: 1, productos: "PURINA", costoUltimo: 10 },
    { numeroSemana: 1, fechaPorSemana: "2025-07-25", mortalidad: 2, seleccion: 2, ventas: 0, productos: "PURINA", costoUltimo: 10 },
];

function exportToXLSX(data: Row[]) {
    const headers = [
        "Numero Semana", "Fechas por Semana", "Mortalidad",
        "Selección", "Ventas", "Productos", "Costo Último"
    ];

    const rows = data.map((r) => [
        r.numeroSemana,
        r.fechaPorSemana,
        r.mortalidad,
        r.seleccion,
        r.ventas,
        r.productos,
        r.costoUltimo,
    ]);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);

    XLSX.utils.book_append_sheet(wb, ws, "Informe Levante");
    XLSX.writeFile(wb, "informe_levante.xlsx");
}

export default function InformeLevante({ data = SAMPLE_DATA }: { data?: Row[] }) {

    const [search, setSearch] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortKey, setSortKey] = useState<keyof Row | null>(null);
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return data.filter((row) =>
            Object.values(row).some((v) =>
                String(v).toLowerCase().includes(q)
            )
        );
    }, [data, search]);

    const sorted = useMemo(() => {
        if (!sortKey) return filtered;

        return [...filtered].sort((a, b) => {
            const av = a[sortKey];
            const bv = b[sortKey];

            if (av < bv) return sortDir === "asc" ? -1 : 1;
            if (av > bv) return sortDir === "asc" ? 1 : -1;
            return 0;
        });
    }, [filtered, sortKey, sortDir]);

    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);

    const paginated = sorted.slice(
        (safePage - 1) * pageSize,
        safePage * pageSize
    );

    const handleSort = (key: keyof Row) => {
        if (sortKey === key) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDir("asc");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">

            <div className="bg-white rounded-lg shadow overflow-hidden">

                <div className="px-5 py-4 border-b text-sm font-semibold text-gray-900">
                    Listado Productos
                </div>

                <div className="flex items-center gap-2 px-5 py-3 border-b">
                    <button
                        onClick={() => window.print()}
                        className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100"
                    >
                        Print
                    </button>

                    <button
                        onClick={() => exportToXLSX(filtered)}
                        className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100"
                    >
                        Export
                    </button>

                    <div className="flex-1" />

                    <input
                        className="border px-3 py-1.5 rounded-md text-sm w-[200px] focus:ring-2 focus:ring-indigo-200"
                        placeholder="Buscar..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">

                        <thead className="bg-gray-100 border-b">
                            <tr>
                                {[
                                    ["numeroSemana", "Semana"],
                                    ["fechaPorSemana", "Fecha"],
                                    ["mortalidad", "Mortalidad"],
                                    ["seleccion", "Selección"],
                                    ["ventas", "Ventas"],
                                    ["productos", "Productos"],
                                    ["costoUltimo", "Costo"],
                                ].map(([key, label]) => (
                                    <th
                                        key={key}
                                        onClick={() => handleSort(key as keyof Row)}
                                        className="px-5 py-3 text-left cursor-pointer hover:text-gray-900"
                                    >
                                        {label}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-10 text-gray-400">
                                        No se encontraron resultados
                                    </td>
                                </tr>
                            ) : (
                                paginated.map((row, i) => (
                                    <tr key={i} className="border-b hover:bg-blue-50">
                                        <td className="px-5 py-3">{row.numeroSemana}</td>
                                        <td className="px-5 py-3">{row.fechaPorSemana}</td>
                                        <td className="px-5 py-3">{row.mortalidad}</td>
                                        <td className="px-5 py-3">{row.seleccion}</td>
                                        <td className="px-5 py-3">{row.ventas}</td>
                                        <td className="px-5 py-3">{row.productos}</td>
                                        <td className="px-5 py-3">{row.costoUltimo}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>

                {/* Paginacion */}
                <div className="flex items-center gap-2 px-5 py-3 border-t">

                    <button onClick={() => setCurrentPage(1)} className="px-2 py-1 border rounded">««</button>
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="px-2 py-1 border rounded">‹</button>

                    <span className="px-3 py-1 bg-indigo-500 text-white rounded">
                        {safePage}
                    </span>

                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="px-2 py-1 border rounded">›</button>
                    <button onClick={() => setCurrentPage(totalPages)} className="px-2 py-1 border rounded">»»</button>

                    <div className="flex-1" />

                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="border rounded px-2 py-1 text-sm"
                    >
                        {[5, 10, 20, 50].map((n) => (
                            <option key={n}>{n}</option>
                        ))}
                    </select>

                </div>

            </div>
        </div>
    );
}