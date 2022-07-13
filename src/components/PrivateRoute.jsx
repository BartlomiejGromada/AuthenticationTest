import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = () => {
    const userCtx = useContext(UserContext);

    return userCtx.user 
            ? <Outlet />
            : <Navigate replace to="/login" />
};

export default PrivateRoute;