import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

const Login = () => {
    const [isCreateAccount, setIsCreateAccount] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { backendURL, setIsLoggedIn, getUserData } =
        useContext(AppContext);

    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        axios.defaults.withCredentials = true;
        setLoading(true);

        try {
            if (isCreateAccount) {
                const response = await axios.post(
                    `${backendURL}/register`,
                    {
                        name,
                        email,
                        password,
                    }
                );

                if (response.status === 201) {
                    toast.success("Account created successfully.");
                    setName("");
                    setEmail("");
                    setPassword("");

                    setIsCreateAccount(false);
                } else {
                    toast.error("Email already exists");
                    navigate("/login");
                }
            } else {
                const response = await axios.post(`${backendURL}/login`, {
                    email,
                    password,
                });

                if (response.status === 200) {
                    const { role } = response.data;

                    localStorage.setItem("role", role);

                    setIsLoggedIn(true);
                    getUserData();

                    toast.success("Login Successfully");

                    if (role === "ROLE_ADMIN") {
                        navigate("/admin-dashboard");
                    } else {
                        navigate("/user-dashboard");
                    }
                } else {
                    toast.error("Email/Password incorrect");
                }
            }
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="position-relative min-vh-100 d-flex justify-content-center align-items-center overflow-hidden px-3"
            style={{
                background:
                    "linear-gradient(135deg, #eef2ff 0%, #dbeafe 50%, #f8fafc 100%)",
            }}
        >
            {/* Background Blur Effects */}
            <div
                style={{
                    position: "absolute",
                    width: "350px",
                    height: "350px",
                    background: "#c4b5fd",
                    borderRadius: "50%",
                    top: "-120px",
                    left: "-120px",
                    filter: "blur(120px)",
                    opacity: 0.7,
                }}
            ></div>

            <div
                style={{
                    position: "absolute",
                    width: "300px",
                    height: "300px",
                    background: "#93c5fd",
                    borderRadius: "50%",
                    bottom: "-100px",
                    right: "-100px",
                    filter: "blur(120px)",
                    opacity: 0.7,
                }}
            ></div>

            {/* Logo */}
            <div
                style={{
                    position: "absolute",
                    top: "25px",
                    left: "35px",
                }}
            >
                <Link
                    to="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        gap: "12px",
                    }}
                >
                    <div
                        style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "14px",
                            background: "#4f46e5",
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "700",
                            fontSize: "24px",
                            boxShadow:
                                "0px 10px 25px rgba(79,70,229,0.35)",
                        }}
                    >
                        D
                    </div>

                    <span
                        style={{
                            fontSize: "28px",
                            fontWeight: "700",
                            color: "#4f46e5",
                            letterSpacing: "1px",
                        }}
                    >
                        Lumineer CO
                    </span>
                </Link>
            </div>

            {/* Login Card */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "450px",
                    background: "rgba(255,255,255,0.75)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "24px",
                    padding: "35px",
                    border: "1px solid rgba(255,255,255,0.5)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                    zIndex: 10,
                }}
            >
                <h2
                    className="text-center fw-bold"
                    style={{
                        color: "#1e293b",
                    }}
                >
                    {isCreateAccount ? "Create Account" : "Welcome Back"}
                </h2>

                <p
                    className="text-center mb-4"
                    style={{
                        color: "#64748b",
                        fontSize: "14px",
                    }}
                >
                    {isCreateAccount
                        ? "Create your  account"
                        : "Login to access your dashboard"}
                </p>

                <form onSubmit={onSubmitHandler}>
                    {isCreateAccount && (
                        <div className="mb-3">
                            <label className="form-label fw-medium">
                                Full Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                                style={{
                                    height: "50px",
                                    borderRadius: "12px",
                                }}
                            />
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="form-label fw-medium">
                            Email Address
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                            style={{
                                height: "50px",
                                borderRadius: "12px",
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-medium">
                            Password
                        </label>

                        <div className="position-relative">
                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                className="form-control pe-5"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                                style={{
                                    height: "50px",
                                    borderRadius: "12px",
                                }}
                            />

                            <span
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                style={{
                                    position: "absolute",
                                    right: "15px",
                                    top: "50%",
                                    transform:
                                        "translateY(-50%)",
                                    cursor: "pointer",
                                    fontSize: "18px",
                                }}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                    </div>

                    {!isCreateAccount && (
                        <div className="d-flex justify-content-end mb-3">
                            <Link
                                to="/reset-password"
                                className="text-decoration-none"
                                style={{
                                    color: "#4f46e5",
                                    fontSize: "14px",
                                }}
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn w-100"
                        style={{
                            height: "50px",
                            borderRadius: "12px",
                            background: "#4f46e5",
                            color: "white",
                            border: "none",
                            fontWeight: "600",
                            fontSize: "16px",
                        }}
                    >
                        {loading
                            ? "Please wait..."
                            : isCreateAccount
                                ? "Create Account"
                                : "Login"}
                    </button>
                </form>

                <div className="text-center mt-4">
                    {isCreateAccount ? (
                        <p className="mb-0">
                            Already have an account?{" "}
                            <span
                                onClick={() =>
                                    setIsCreateAccount(false)
                                }
                                style={{
                                    color: "#4f46e5",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                }}
                            >
                                Login
                            </span>
                        </p>
                    ) : (
                        <p className="mb-0">
                            Don't have an account?{" "}
                            <span
                                onClick={() =>
                                    setIsCreateAccount(true)
                                }
                                style={{
                                    color: "#4f46e5",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                }}
                            >
                                Sign Up
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;