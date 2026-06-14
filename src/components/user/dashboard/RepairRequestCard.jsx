import RepairTracker from "./RepairTracker";

const RepairRequestCard = ({ request }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case "PENDING":
                return {
                    color: "#f59e0b",
                    text: "PENDING",
                };

            case "ACCEPTED":
                return {
                    color: "#8b5cf6",
                    text: "ACCEPTED",
                };

            case "IN_PROGRESS":
                return {
                    color: "#06b6d4",
                    text: "IN PROGRESS",
                };

            case "COMPLETED":
                return {
                    color: "#22c55e",
                    text: "COMPLETED",
                };

            case "REJECTED":
                return {
                    color: "#ef4444",
                    text: "REJECTED",
                };

            default:
                return {
                    color: "#6b7280",
                    text: status,
                };
        }
    };

    const status = getStatusConfig(request.status);

    return (
        <div
            className="card border-0 h-100"
            style={{
                borderRadius: "20px",
                background: "#f8fafc",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
            }}
        >
            <div className="card-body p-4">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h5 className="fw-bold mb-1">
                            💻 {request.laptopBrand}
                        </h5>

                        <small className="text-muted">
                            {request.laptopModel}
                        </small>
                    </div>

                    <span
                        className="badge px-3 py-2"
                        style={{
                            background: status.color,
                            color: "#fff",
                            borderRadius: "12px",
                            fontSize: "12px",
                        }}
                    >
                        {status.text}
                    </span>
                </div>

                {/* Admin Message */}
                <div
                    className="mb-4 p-3"
                    style={{
                        background: "#ffffff",
                        border: "1px solid #d8b4fe",
                        borderRadius: "14px",
                    }}
                >
                    <div
                        className="fw-bold mb-2"
                        style={{
                            color: "#7c3aed",
                        }}
                    >
                        💬 Admin Message
                    </div>

                    <div className="text-muted">
                        {request.adminRemarks ||
                            "No message from admin yet"}
                    </div>
                </div>

                {/* Issue */}
                <div className="mb-3">
                    <strong>🔧 Issue</strong>
                    <div className="text-muted">
                        {request.issueDescription}
                    </div>
                </div>

                {/* Contact */}
                <div className="mb-3">
                    <strong>📞 Contact</strong>
                    <div className="text-muted">
                        {request.contactNumber}
                    </div>
                </div>

                {/* Address */}
                <div className="mb-3">
                    <strong>📍 Address</strong>
                    <div className="text-muted">
                        {request.address}
                    </div>
                </div>





                {/* Tracker */}
                {request.status !== "REJECTED" && (
                    <>
                        <hr />
                        <RepairTracker
                            status={request.status}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default RepairRequestCard;