interface Props {
    loading: boolean;
    success: boolean;
    error: string | null;
}
export default function ProveedorFooter({ loading, success, error }: Props) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 mt-6">

            <button
                type="submit"
                disabled={loading}
                className="px-8 py-2 border-2 border-blue-700 text-blue-700 font-semibold rounded-lg transition disabled:opacity-50"
            >
                {loading ? "Guardando..." : "Guardar"}
            </button>

            {success && (
                <span className="text-green-600 font-medium">
                    ✓ Guardado correctamente
                </span>
            )}

            {error && (
                <span className="text-red-600 font-medium">
                    ✕ {error}
                </span>
            )}
        </div>
    );
}