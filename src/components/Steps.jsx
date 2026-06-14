import React from "react";
import {
    FileText,
    PhoneCall,
    Wrench,
    Truck,
    ArrowDown,
} from "lucide-react";

const Steps = () => {
    const steps = [
        {
            icon: <FileText size={35}/>,
            title: "Submit Repair Request",
            desc: "Fill out the repair request form with your laptop details and issue description.",
            bg: "primary",
        },
        {
            icon: <PhoneCall size={35}/>,
            title: "Company Contacts You",
            desc: "Our support team reviews your request and contacts you to confirm the issue.",
            bg: "success",
        },
        {
            icon: <Wrench size={35}/>,
            title: "Technician Visits Home",
            desc: "A skilled technician visits your location and inspects the laptop problem.",
            bg: "warning",
        },
        {
            icon: <Truck size={35}/>,
            title: "Repair or Pickup & Drop",
            desc: "If the issue can be fixed at home, it's repaired immediately. Otherwise, we provide secure pickup and drop service.",
            bg: "danger",
        },
    ];

    return (
        <section
            id="how-it-works"
            className="py-5"
            style={{backgroundColor: "#F8F9FB"}}
        >
            <div className="container">
                {/* Heading */}
                <div className="text-center mb-5">
                    <h2 className="fw-bold display-5">
                        How It <span className="text-primary">Works</span>
                    </h2>
                    <p className="text-muted fs-5 mt-3">
                        Getting your laptop repaired is simple and hassle-free.
                    </p>
                </div>

                {/* Steps */}
                <div className="row g-4 justify-content-center">
                    {steps.map((step, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-3">
                            <div
                                className="card h-100 border-0 shadow-sm text-center p-4 position-relative"
                                style={{
                                    borderRadius: "20px",
                                    transition: "0.3s",
                                }}
                            >
                                {/* Step Number */}
                                <div
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                        lineHeight: "28px",
                                        fontSize: "14px",
                                    }}
                                >
                                    {index + 1}
                                </div>

                                {/* Icon */}
                                <div
                                    className={`bg-${step.bg} text-white mx-auto d-flex align-items-center justify-content-center mb-4`}
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        borderRadius: "20px",
                                    }}
                                >
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h4 className="fw-semibold mb-3">{step.title}</h4>

                                <p className="text-muted mb-0">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Arrow */}
                            {index !== steps.length - 1 && (
                                <div className="d-flex justify-content-center mt-3 d-lg-none">
                                    <ArrowDown size={28} className="text-secondary"/>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Steps;