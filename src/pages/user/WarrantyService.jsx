import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { AppContext } from "../../context/AppContext";
import EmptyState from "../../components/user/dashboard/EmptyState";

const WarrantyService = () => {
    const { backendURL } = useContext(AppContext);

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWarrantyRequests = async () => {
        try {
            const response = await axios.get(
                `${backendURL}/user/my-requests`,
                {
                    withCredentials: true,
                }
            );

            const warrantyRequests = response.data
                .filter(
                    (request) =>
                        request.warrantyStatus === "UNDER WARRANTY"
                )
                .sort((a, b) => b.id - a.id);

            setRequests(warrantyRequests);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWarrantyRequests();
    }, []);

    const getRemainingDays = (endDate) => {
        if (!endDate) return 0;

        const today = new Date();
        const warrantyEnd = new Date(endDate);

        const diffTime =
            warrantyEnd.getTime() - today.getTime();

        return Math.max(
            Math.ceil(
                diffTime / (1000 * 60 * 60 * 24)
            ),
            0
        );
    };

    const handleClaimWarranty = (request) => {
        console.log("Claim Warranty:", request);

        // Future API Call
        // axios.post(...)
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-success"></div>
                <h5 className="mt-3">
                    Loading Warranty Services...
                </h5>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="mb-4">
                <h2 className="fw-bold">
                    Warranty Services
                </h2>

                <p className="text-muted">
                    View all laptops currently under
                    warranty
                </p>
            </div>

            {requests.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="row g-4">
                    {requests.map((request) => (
                        <div
                            key={request.id}
                            className="col-xl-4 col-lg-6"
                        >
                            <div
                                className="card border-0 h-100"
                                style={{
                                    background: "#f8fafc",
                                    borderRadius: "20px",
                                    boxShadow:
                                        "0 10px 25px rgba(0,0,0,0.08)",
                                }}
                            >
                                <div
                                    className="card-body p-4 d-flex flex-column"
                                    style={{
                                        minHeight: "650px",
                                    }}
                                >
                                    {/* Header */}
                                    <div
                                        className="d-flex justify-content-between align-items-start mb-3"
                                        style={{
                                            minHeight: "80px",
                                        }}
                                    >
                                        <h5
                                            className="fw-bold mb-0"
                                            style={{
                                                color: "#111827",
                                            }}
                                        >
                                            💻{" "}
                                            {
                                                request.laptopBrand
                                            }
                                        </h5>

                                        <span className="badge bg-success px-3 py-2">
                                            Warranty Active
                                        </span>
                                    </div>

                                    {/* Model */}
                                    <div
                                        className="mb-3 p-3 d-flex align-items-center"
                                        style={{
                                            background: "#eef2ff",
                                            borderRadius: "12px",
                                            minHeight: "100px",
                                        }}
                                    >
                                        <div>
                                            <strong>💻 Model:</strong>{" "}
                                            {request.laptopModel}
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="mb-3">
                                        <strong>
                                            🔄 Repair Status:
                                        </strong>
                                        <div className="text-muted">
                                            {
                                                request.status
                                            }
                                        </div>
                                    </div>

                                    {/* Warranty Details */}
                                    <div
                                        className="p-3 mb-3"
                                        style={{
                                            background:
                                                "#ecfdf5",
                                            border:
                                                "1px solid #86efac",
                                            borderRadius:
                                                "14px",
                                        }}
                                    >
                                        <h6 className="fw-bold mb-3 text-success">
                                            🛡️ Warranty
                                            Details
                                        </h6>

                                        <p className="mb-2">
                                            <strong>
                                                Status:
                                            </strong>{" "}
                                            {
                                                request.warrantyStatus
                                            }
                                        </p>

                                        <p className="mb-2">
                                            <strong>
                                                Duration:
                                            </strong>{" "}
                                            {
                                                request.warrantyMonths
                                            }{" "}
                                            Months
                                        </p>

                                        <p className="mb-2">
                                            <strong>
                                                End Date:
                                            </strong>{" "}
                                            {
                                                request.warrantyEndDate
                                            }
                                        </p>

                                        <p className="mb-0">
                                            <strong>
                                                Remaining:
                                            </strong>{" "}
                                            {getRemainingDays(
                                                request.warrantyEndDate
                                            )}{" "}
                                            Days
                                        </p>
                                    </div>

                                    {/* Admin Remarks */}
                                    <div
                                        style={{
                                            background: "#faf5ff",
                                            border: "1px solid #d8b4fe",
                                            borderRadius: "14px",
                                            minHeight: "140px",
                                        }}
                                    >
                                        <div className="p-3">
                                            <h6
                                                className="fw-bold mb-2"
                                                style={{
                                                    color: "#7c3aed",
                                                }}
                                            >
                                                💬 Admin
                                                Remarks
                                            </h6>

                                            <p className="mb-0 text-muted">
                                                {request.adminRemarks
                                                    ? request.adminRemarks
                                                    : "No remarks provided by admin."}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <div className="d-grid mt-auto pt-3">
                                        <button
                                            type="button"
                                            className="btn btn-lg text-white fw-bold"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg,#22c55e,#16a34a)",
                                                border:
                                                    "none",
                                                borderRadius:
                                                    "12px",
                                            }}
                                            onClick={() =>
                                                handleClaimWarranty(
                                                    request
                                                )
                                            }
                                        >
                                            🛡️ Claim
                                            Warranty
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WarrantyService;