import { useAppStore } from "@/stores/useAppStore";
import { Navigate, Outlet } from "react-router";

interface PublicRouteProps {
  redirectPath?: string;
}

export default function PublicRoute({
  redirectPath = "/dashboard",
}: PublicRouteProps) {
  const appStore = useAppStore();
  const isAuthenticated = appStore.isAuthenticated;
  
  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}