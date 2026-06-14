
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
    const role = localStorage.getItem("role");

    if (role === "ROLE_ADMIN") {
        return <Navigate to="/admin-dashboard" replace />;
    }

    if (role === "ROLE_USER") {
        return <Navigate to="/user-dashboard" replace />;
    }

    return children;
};

export default GuestRoute;