import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
    const role = localStorage.getItem("role");

    return role === "ROLE_USER"
        ? children
        : <Navigate to="/" replace />;
};

export default UserRoute;