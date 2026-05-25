import { useAppStore } from "@/stores/useAppStore";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
    redirectPath?: string;
}

export default function ProtectedRoute({
    redirectPath = "/login",
}: ProtectedRouteProps) {
    const appStore = useAppStore();
    const isAuthenticated = appStore.isAuthenticated;
    if (!isAuthenticated) {
        return <Navigate
            to={redirectPath}
            replace
            state={{ from: location.pathname + location.search }}
        />;
    }

    return <Outlet />;
}