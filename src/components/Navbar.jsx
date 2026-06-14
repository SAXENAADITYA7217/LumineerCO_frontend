import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    const role = localStorage.getItem("role");

    return (
        <nav
            className="navbar navbar-expand-lg fixed-top"
            style={{
                top: "20px",
                left: "0",
                right: "0",
                maxWidth: "1250px",
                margin: "0 auto",
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "24px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                padding: "14px 28px",
            }}
        >
            <div className="container-fluid">

                {/* Logo */}
                <Link
                    to="/"
                    className="navbar-brand d-flex align-items-center gap-3 m-0"
                >
                    <div
                        className="d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{
                            width: "42px",
                            height: "42px",
                            background:
                                "linear-gradient(135deg, #9333ea, #7e22ce)",
                            borderRadius: "14px",
                            fontSize: "18px",
                        }}
                    >
                        D
                    </div>

                    <span
                        className="fw-bold"
                        style={{
                            fontSize: "1.4rem",
                            color: "#111827",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        Lumineer CO
                    </span>
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler border-0 shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Content */}
                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                >
                    {/* Center Links */}
                    <ul className="navbar-nav mx-auto gap-lg-4 text-center">
                        {["Features", "Services"].map((item) => (
                            <li className="nav-item" key={item}>
                                <a
                                    className="nav-link fw-semibold"
                                    href={`#${item.toLowerCase()}`}
                                    style={{
                                        color: "#374151",
                                        transition: "all 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = "#9333ea";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = "#374151";
                                    }}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Right Side Button */}


                    <div className="d-flex justify-content-center justify-content-lg-end mt-3 mt-lg-0">

                        {!role ? (
                            <Link
                                to="/login"
                                className="btn text-white fw-bold px-4 py-2"
                                style={{
                                    background: "linear-gradient(135deg,#9333ea,#7e22ce)",
                                    border: "none",
                                    borderRadius: "16px",
                                    boxShadow: "0 8px 20px rgba(147,51,234,0.3)",
                                }}
                            >
                                Get Started →
                            </Link>
                        ) : (
                            <Link
                                to={
                                    role === "ROLE_ADMIN"
                                        ? "/admin-dashboard"
                                        : "/user-dashboard"
                                }
                                className="btn text-white fw-bold px-4 py-2"
                                style={{
                                    background: "linear-gradient(135deg,#9333ea,#7e22ce)",
                                    border: "none",
                                    borderRadius: "16px",
                                    boxShadow: "0 8px 20px rgba(147,51,234,0.3)",
                                }}
                            >
                                Dashboard →
                            </Link>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;