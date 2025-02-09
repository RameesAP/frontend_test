import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentUser } from "../api/apiServices";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const location = useLocation();
  
  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  if (isLoading) return <div>Loading...</div>;
  // 🔹 If no user, redirect to sign-in page
  if (!user) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  // 🔹 If user exists but doesn't have access, redirect based on role
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === "admin" ? "/dashboard" : "/"} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
