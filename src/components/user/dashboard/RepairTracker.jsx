const RepairTracker = ({ status }) => {
    const steps = [
        "PENDING",
        "ACCEPTED",
        "IN_PROGRESS",
        "COMPLETED",
    ];

    const currentStep = steps.indexOf(status);

    return (
        <div className="mt-4">
            {/* Progress Line */}
            <div className="position-relative">
                <div
                    style={{
                        position: "absolute",
                        top: "18px",
                        left: "10%",
                        right: "10%",
                        height: "4px",
                        background: "#dee2e6",
                        zIndex: 1,
                    }}
                />

                <div className="d-flex justify-content-between position-relative">
                    {steps.map((step, index) => (
                        <div
                            key={step}
                            className="text-center"
                            style={{
                                flex: 1,
                                zIndex: 2,
                            }}
                        >
                            <div
                                className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
                                style={{
                                    width: "38px",
                                    height: "38px",
                                    backgroundColor:
                                        index <= currentStep
                                            ? "#198754"
                                            : "#dee2e6",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    border: "3px solid #fff",
                                    boxShadow:
                                        "0 2px 8px rgba(0,0,0,0.15)",
                                }}
                            >
                                ✓
                            </div>

                            <div
                                className="mt-2"
                                style={{
                                    fontSize: "11px",
                                    fontWeight:
                                        index <= currentStep
                                            ? "600"
                                            : "500",
                                    color:
                                        index <= currentStep
                                            ? "#198754"
                                            : "#6c757d",
                                    wordBreak: "break-word",
                                    padding: "0 4px",
                                }}
                            >
                                {step.replace("_", " ")}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RepairTracker;