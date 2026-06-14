import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext.jsx";

const AdminNavbar = () => {
    const { backendURL, setIsLoggedIn, setUserData } =
        useContext(AppContext);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            axios.defaults.withCredentials = true;

            const response = await axios.post(`${backendURL}/logout`);

            if (response.status === 200) {
                setIsLoggedIn(false);
                setUserData(null);
                localStorage.clear();

                toast.success("Logged out successfully");
                navigate("/");
            }
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Logout Failed"
            );
        }
    };

    return (
        <nav
            className="navbar px-3 px-md-4 py-3 mx-2 mx-md-3 mt-3 rounded-5"
            style={{
                background: "#E2E8F0",
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.04)",
            }}
        >
            <div className="container-fluid p-0 d-flex justify-content-between align-items-center">

                {/* Left Section */}
                <div className="d-flex align-items-center gap-3">

                    {/* Mobile Sidebar Toggle */}
                    <button
                        className="btn d-md-none border-0 shadow-sm"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#userSidebar"
                        aria-controls="userSidebar"
                        style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "12px",
                            background: "#fff",
                        }}
                    >
                        ☰
                    </button>

                    {/* Logo */}
                    <Link
                        to="/"
                        className="navbar-brand d-flex align-items-center gap-3 text-decoration-none m-0"
                    >
                        <div
                            style={{
                                width: "52px",
                                height: "52px",
                                borderRadius: "18px",
                                background:
                                    "linear-gradient(135deg,#A855F7,#6D28D9)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontSize: "28px",
                                fontWeight: "800",
                                boxShadow:
                                    "0 10px 25px rgba(124,58,237,0.35)",
                            }}
                        >
                            D
                        </div>

                        <span
                            style={{
                                color: "#111827",
                                fontSize: "1.5rem",
                                fontWeight: "800",
                                letterSpacing: "-0.5px",
                            }}
                        >
                            Lumineer CO
                        </span>
                    </Link>
                </div>

                {/* Right Section */}
                <div className="d-flex align-items-center">
                    <button
                        onClick={handleLogout}
                        className="btn border-0 text-white fw-bold px-4 py-2"
                        style={{
                            background:
                                "linear-gradient(135deg,#A855F7,#7C3AED)",
                            borderRadius: "18px",
                            minWidth: "140px",
                            fontSize: "15px",
                            boxShadow:
                                "0 10px 25px rgba(124,58,237,0.35)",
                            transition: "all 0.3s ease",
                        }}
                    >
                        Logout →
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar ;