interface Props {
    loading: boolean;
}

export default function ProveedorFooter({ loading }: Props) {

    return (
        <div className="flex flex-col items-center justify-center gap-2 mt-6">

            <button
                type="submit"
                disabled={loading}
                className={`px-8 py-2 border-2 font-semibold rounded-lg transition
                    ${loading
                        ? "border-gray-400 text-gray-400 bg-gray-100 cursor-not-allowed"
                        : "border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
                    }`}
            >
                {loading
                    ? "Guardando..."
                    : "Guardar"}
            </button>

        </div>
    );
}