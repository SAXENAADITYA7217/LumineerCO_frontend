import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const role = localStorage.getItem("role");

    return role === "ROLE_ADMIN"
        ? children
        : <Navigate to="/" replace />;
};

export default AdminRoute;