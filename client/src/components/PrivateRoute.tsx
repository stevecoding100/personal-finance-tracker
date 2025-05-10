import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../store/store";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const location = useLocation();

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
