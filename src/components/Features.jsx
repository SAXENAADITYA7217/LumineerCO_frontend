import React from "react";
import {
    Shield,
    Headphones,
    Sliders,
    ArrowUpDown,
    Zap,
    UserCheck,
} from "lucide-react";

const Features = () => {
    const features = [
        {
            icon: <Shield size={26} />,
            title: "Secure",
            desc: "We strictly only deal with vendors that provide top notch security.",
        },
        {
            icon: <Headphones size={26} />,
            title: "24/7 Support",
            desc: "We are always here to help you anytime, anywhere with full support.",
        },
        {
            icon: <Sliders size={26} />,
            title: "Customizable",
            desc: "Easily customize everything according to your needs.",
        },
        {
            icon: <ArrowUpDown size={26} />,
            title: "Reliable",
            desc: "We ensure high reliability with consistent performance.",
        },
        {
            icon: <Zap size={26} />,
            title: "Fast",
            desc: "Experience lightning fast performance with our platform.",
        },
        {
            icon: <UserCheck size={26} />,
            title: "User Friendly",
            desc: "Simple and intuitive design for better user experience.",
        },
    ];

    return (
        <section id="features" className="py-5 bg-light">
            <div className="container">

                {/* Heading */}
                <div className="text-center mx-auto mb-5" style={{ maxWidth: "700px" }}>
                    <h2 className="display-5 fw-bold text-dark">
                        We have Amazing <span className="text-primary">Service</span>
                    </h2>

                    <p className="text-muted mt-3 fs-5">
                        Our platform provides the best solutions with top-notch performance
                        and a seamless user experience.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="row g-4">
                    {features.map((item, index) => (
                        <div key={index} className="col-sm-6 col-lg-4">
                            <div
                                className="card border-0 shadow-sm h-100 p-4 feature-card"
                                style={{
                                    transition: "all 0.3s ease",
                                    borderRadius: "20px",
                                }}
                            >
                                {/* Icon */}
                                <div
                                    className="d-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: "56px",
                                        height: "56px",
                                        borderRadius: "12px",
                                        backgroundColor: "#e9d5ff",
                                        color: "#7c3aed",
                                    }}
                                >
                                    {item.icon}
                                </div>

                                {/* Content */}
                                <h4 className="fw-semibold mb-3">{item.title}</h4>

                                <p className="text-muted mb-0">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <style>{`
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,.15) !important;
        }
      `}</style>
        </section>
    );
};

export default Features;