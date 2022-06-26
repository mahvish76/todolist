import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hook/useAuth";
import Container from "./Container";
import Login from "./Login";

const CheckAuthentication = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    user ? <Outlet /> : <Navigate to={"/login"} state={{ from: location}} replace />
  )
}

export default CheckAuthentication