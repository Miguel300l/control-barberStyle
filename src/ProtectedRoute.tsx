import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./store/authStore";

export default function ProtectedRoute() {
    const user = useAuthStore((state) => state.user);
    const loading = useAuthStore((state) => state.loading);

    if (loading) return <div>Cargando...</div>;

    return user ? <Outlet /> : <Navigate to="/signin" replace />;
}