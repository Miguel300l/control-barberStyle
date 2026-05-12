import { useMemo, useState } from "react";
import * as XLSX from "xlsx";

interface Column<T> {
    key: keyof T;
    label: string;
}

interface TableToolsProps<T> {
    data: T[];
    columns: Column<T>[];
    fileName?: string;
    title?: string;
}

export default function TableTools<T extends Record<string, any>>({
    data,
    columns,
    fileName = "reporte.xlsx",
    title = "REPORTE",
}: TableToolsProps<T>) {
    const [search, setSearch] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortKey, setSortKey] = useState<keyof T | null>(null);
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

    const exportToXLSX = () => {
        const headers = columns.map((c) => c.label);

        const rows = filtered.map((row) =>
            columns.map((c) => row[c.key]),
        );

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);

        XLSX.utils.book_append_sheet(wb, ws, title);
        XLSX.writeFile(wb, fileName);
    };

    const filtered = useMemo(() => {
        const q = search.toLowerCase();

        return data.filter((row) =>
            Object.values(row).some((v) =>
                String(v).toLowerCase().includes(q),
            ),
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
        safePage * pageSize,
    );

    const handleSort = (key: keyof T) => {
        if (sortKey === key) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDir("asc");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <h2 className="font-semibold text-left mb-4 p-5">{title}</h2>

            <div className="flex items-center gap-2 px-5 py-3 border-b">
                <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100"
                >
                    Print
                </button>

                <button
                    onClick={exportToXLSX}
                    className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100"
                >
                    Export
                </button>

                <div className="flex-1" />

                <input
                    className="border px-3 py-1.5 rounded-md text-sm w-[200px]"
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            {/* TABLA */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm font-[Outfit] text-gray-700 dark:text-gray-400">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={String(col.key)}
                                    onClick={() => handleSort(col.key)}
                                    className="px-5 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-400 cursor-pointer hover:text-gray-900"

                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {paginated.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center py-10 text-gray-400"
                                >
                                    No se encontraron resultados
                                </td>
                            </tr>
                        ) : (
                            paginated.map((row, i) => (
                                <tr key={i} className="border-b hover:bg-blue-50">
                                    {columns.map((col) => (
                                        <td
                                            key={String(col.key)}
                                            className="px-5 py-3"
                                        >
                                            {String(row[col.key])}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINACION */}
            <div className="flex items-center gap-2 px-5 py-3 border-t">
                <button
                    onClick={() => setCurrentPage(1)}
                    className="px-2 py-1 border rounded"
                >
                    ««
                </button>

                <button
                    onClick={() =>
                        setCurrentPage((p) => Math.max(1, p - 1))
                    }
                    className="px-2 py-1 border rounded"
                >
                    ‹
                </button>

                <span className="px-3 py-1 bg-indigo-500 text-white rounded">
                    {safePage}
                </span>

                <button
                    onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    className="px-2 py-1 border rounded"
                >
                    ›
                </button>

                <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-2 py-1 border rounded"
                >
                    »»
                </button>

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
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}