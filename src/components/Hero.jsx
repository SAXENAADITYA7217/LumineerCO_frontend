import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {

    const role = localStorage.getItem("role");
    return (
        <section
            className="d-flex align-items-center"
            style={{
                minHeight: "100vh",
                background: "#f8fafc",
                paddingTop: "120px", // Fixed Navbar ke liye
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">

                        {/* Heading */}
                        <h1
                            className="fw-bold text-dark"
                            style={{
                                fontSize: "clamp(2rem, 4vw, 3.8rem)",
                                lineHeight: "1.2",
                            }}
                        >
                            Fast & Reliable <br />
                            <span className="text-primary">
                Laptop Repair
              </span>
                            <br />
                            Services
                        </h1>

                        {/* Description */}
                        <p
                            className="text-secondary mt-4 mx-auto"
                            style={{
                                maxWidth: "700px",
                                fontSize: "1.15rem",
                                lineHeight: "1.8",
                            }}
                        >
                            Facing issues with your laptop or PC? Get expert hardware
                            solutions at your doorstep. Quick diagnosis, affordable pricing,
                            and trusted service.
                        </p>

                        {/* Button */}
                        <div className="mt-5">
                            <Link
                                to={
                                    !role
                                        ? "/login"
                                        : role === "ROLE_ADMIN"
                                            ? "/admin-dashboard"
                                            : "/user-dashboard"
                                }
                                className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-semibold shadow"
                            >
                                Book Repair →
                            </Link>
                        </div>

                        {/* Features */}
                        <div className="mt-4 d-flex flex-wrap justify-content-center gap-3">
              <span className="badge bg-primary-subtle text-primary px-4 py-2 rounded-pill fs-6">
                🛠 Certified Technicians
              </span>

                            <span className="badge bg-primary-subtle text-primary px-4 py-2 rounded-pill fs-6">
                💰 Affordable Pricing
              </span>
                        </div>

                        {/* Trust Text */}
                        <div className="mt-5">
                            <p className="text-muted fs-5 mb-0">
                                Trusted by <strong>500+</strong> Customers
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;