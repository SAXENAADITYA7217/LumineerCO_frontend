import {Link, useNavigate} from "react-router-dom";

import {useContext, useRef, useState} from "react";
import {AppContext} from "../context/AppContext.jsx";
import axios from "axios";
import {toast} from "react-toastify";

const ResetPassword = ()=>{
    const inputRef = useRef([]);
    const [loading, setLoading] = useState(false);
    const {userData, isLoggedIn, getUserData, backendURL} = useContext(AppContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword]  = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [otp, setOtp] = useState(false);
    const [isOtpSubmited, setIsOtpSubmited] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    axios.defaults.withCredentials = true;
    const handleChange = (e, index)=>{
        const value = e.target.value.replace(/\D/g,""); // yeh sirf number lene ke liye ha
        e.target.value = value;
        if(value &&index<5){
            inputRef.current[index+1].focus();
        }
    }

    const handleKeyDown = (e, index)=>{
        if(e.key==='Backspace' && !e.target.value && index>0){
            inputRef.current[index-1].focus();
        }
    }
    // yeh fuction isliye banya ha taki email se otp copy karke direct paste kar de mannully type na karna padhe
    const handlePaste = (e) => {
        e.preventDefault();

        const paste = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6)
            .split("");

        paste.forEach((digit, i) => {
            if (inputRef.current[i]) {
                inputRef.current[i].value = digit;
            }
        });

        const next = Math.min(paste.length, 5);
        inputRef.current[next]?.focus();
    };

    const onSubmitEmail = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const response =  await  axios.post(backendURL+"/send-reset-otp?email="+email);
            if(response.status===200){
                toast.success("Password reset Otp send Successfully!");
                setIsEmailSent(true);
            }
            else{
                toast.error("Something went wrong, please try again");
            }
        }
        catch (error){
            toast.error(error.message);

        }
        finally {
            setLoading(false);
        }

    }

    const handleVerify = async (e) => {
        e.preventDefault();

        const enteredOtp = inputRef.current
            .map((input) => input.value)
            .join("");

        if (enteredOtp.length !== 6) {
            toast.error("Please enter all 6 digits of OTP");
            return;
        }

        setLoading(true);

        try {

            const response = await axios.post(
                `${backendURL}/verify-reset-otp`,
                {
                    email,
                    otp: enteredOtp
                }
            );

            if (response.status === 200) {
                setOtp(enteredOtp);
                setIsOtpSubmited(true);
                toast.success("OTP Verified Successfully");
            }

        } catch (error) {

            toast.error(
                error.response?.data || "Invalid OTP"
            );

        } finally {
            setLoading(false);
        }
    };

    const onSubmitNewPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = axios.post(backendURL+"/reset-password", {
                email,
                otp,
                newPassword
            })
            if((await response).status===200){
                toast.success("Password reset successfully!");
                navigate("/login");
            }
            else{
                toast.error("Something went wrong, please try again");
            }
        }
        catch (error){
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="d-flex align-items-center justify-content-center vh-100 position-relative overflow-hidden"
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
            />

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
            />

            {/* Logo */}
            <Link
                to="/"
                className="position-absolute top-0 start-0 p-4 text-decoration-none d-flex align-items-center gap-3"
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
                        boxShadow: "0 10px 25px rgba(79,70,229,0.35)",
                    }}
                >
                    D
                </div>

                <span
                    style={{
                        fontSize: "28px",
                        fontWeight: "700",
                        color: "#4f46e5",
                    }}
                >
                Lumineer CO
            </span>
            </Link>

            {/* Email Form */}
            {!isEmailSent && (
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
                    }}
                >
                    <h3 className="text-center fw-bold mb-2">
                        Reset Password
                    </h3>

                    <p className="text-center text-muted mb-4">
                        Enter your registered email address
                    </p>

                    <form onSubmit={onSubmitEmail}>
                        <div
                            className="input-group mb-4"
                            style={{
                                border: "1px solid #e2e8f0",
                                borderRadius: "14px",
                                overflow: "hidden",
                            }}
                        >
                        <span className="input-group-text bg-white border-0">
                            <i className="bi bi-envelope"></i>
                        </span>

                            <input
                                type="email"
                                className="form-control border-0"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    height: "55px",
                                }}
                            />
                        </div>

                        <button
                            disabled={loading}
                            className="btn w-100 text-white fw-semibold"
                            type="submit"
                            style={{
                                background: "#4f46e5",
                                border: "none",
                                height: "52px",
                                borderRadius: "14px",
                            }}
                        >
                            {loading ? "Loading..." : "Continue"}
                        </button>
                    </form>
                </div>
            )}

            {/* OTP Verification */}
            {!isOtpSubmited && isEmailSent && (
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
                    }}
                >
                    <h3 className="text-center fw-bold mb-2">
                        Verify OTP
                    </h3>

                    <p className="text-center text-muted mb-4">
                        Enter the 6-digit code sent to your email
                    </p>

                    <div className="d-flex justify-content-center gap-2 mb-4">
                        {[...Array(6)].map((_, i) => (
                            <input
                                key={i}
                                type="text"
                                maxLength={1}
                                ref={(el) => (inputRef.current[i] = el)}
                                onChange={(e) => handleChange(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                onPaste={handlePaste}
                                className="form-control text-center fw-bold"
                                style={{
                                    width: "55px",
                                    height: "60px",
                                    borderRadius: "14px",
                                    border: "1px solid #cbd5e1",
                                    fontSize: "22px",
                                }}
                            />
                        ))}
                    </div>

                    <button
                        className="btn w-100 text-white fw-semibold"
                        disabled={loading}
                        onClick={handleVerify}
                        style={{
                            background: "#4f46e5",
                            border: "none",
                            height: "52px",
                            borderRadius: "14px",
                        }}
                    >
                        {loading ? "Verifying..." : "Verify Email"}
                    </button>
                </div>
            )}

            {/* New Password Form */}
            {isOtpSubmited && isEmailSent && (
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
                    }}
                >
                    <div className="text-center mb-4">
                        <div
                            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                            style={{
                                width: "70px",
                                height: "70px",
                                background: "#eef2ff",
                            }}
                        >
                            <i
                                className="bi bi-shield-lock-fill"
                                style={{
                                    fontSize: "2rem",
                                    color: "#4f46e5",
                                }}
                            />
                        </div>

                        <h3 className="fw-bold mb-2">
                            Create New Password
                        </h3>

                        <p className="text-muted">
                            Choose a strong password for your account
                        </p>
                    </div>

                    <form onSubmit={onSubmitNewPassword}>
                        <div
                            className="input-group mb-4"
                            style={{
                                border: "1px solid #e2e8f0",
                                borderRadius: "14px",
                                overflow: "hidden",
                            }}
                        >
                        <span className="input-group-text bg-white border-0">
                            <i className="bi bi-key-fill"></i>
                        </span>

                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control border-0"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                required
                                style={{
                                    height: "55px",
                                }}
                            />

                            <span
                                className="input-group-text bg-white border-0"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="btn w-100 text-white fw-semibold"
                            style={{
                                background: "#4f46e5",
                                border: "none",
                                height: "52px",
                                borderRadius: "14px",
                            }}
                        >
                            {loading ? "Loading..." : "Reset Password"}
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <small className="text-muted">
                            Use at least 8 characters with letters, numbers &
                            symbols.
                        </small>
                    </div>
                </div>
            )}
        </div>
    );
}
export default ResetPassword;