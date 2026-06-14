import { useContext, useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { AppContext } from "../../context/AppContext";

const AllRequestBySelectedUser = () => {
    const { backendURL } = useContext(AppContext);

    const [users, setUsers] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState("");
    const [requests, setRequests] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingRequests, setLoadingRequests] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${backendURL}/admin/get-all-users`);
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingUsers(false);
        }
    };

    const fetchRequestsByUser = async (email) => {
        try {
            setLoadingRequests(true);
            const response = await axios.get(`${backendURL}/admin/get-request-by-user`, {
                params: { email },
            });

            const sortedRequests = response.data.sort(
                (a, b) => new Date(b.updatedDate) - new Date(a.updatedDate)
            );

            setRequests(sortedRequests);
        } catch (error) {
            console.error(error);
            setRequests([]);
        } finally {
            setLoadingRequests(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserChange = (e) => {
        const email = e.target.value;
        setSelectedEmail(email);

        if (email) {
            fetchRequestsByUser(email);
        } else {
            setRequests([]);
        }
    };

    // Helper to get custom gradient styles based on status
    const getStatusStyle = (status) => {
        switch (status) {
            case "PENDING":
                return { background: "linear-gradient(135deg, #ff9900, #ff5500)", color: "#fff" };
            case "ACCEPTED":
                return { background: "linear-gradient(135deg, #00d2ff, #0066ff)", color: "#fff" };
            case "IN_PROGRESS":
                return { background: "linear-gradient(135deg, #7f00ff, #e100ff)", color: "#fff" };
            case "COMPLETED":
                return { background: "linear-gradient(135deg, #11998e, #38ef7d)", color: "#fff" };
            default:
                return { background: "linear-gradient(135deg, #ff416c, #ff4b2b)", color: "#fff" };
        }
    };

    return (
        <div className="container-fluid py-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
            {/* Page Header */}
            <div className="d-flex align-items-center mb-4">
                <div className="p-2 bg-primary text-white rounded-3 me-3 shadow-sm d-flex align-items-center justify-content-center" style={{ width: "45px", height: "45px" }}>
                    <i className="bi bi-person-lines-fill fs-5"></i>
                </div>
                <div>
                    <h2 className="fw-extrabold text-dark m-0" style={{ letterSpacing: "-0.5px" }}>Requests Management</h2>
                    <p className="text-muted small m-0">Filter and view comprehensive device repair requests by user</p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="card shadow-sm border-0 mb-5 rounded-4" style={{ background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(10px)" }}>
                <div className="card-body p-4">
                    <label className="form-label fw-bold text-secondary mb-2">
                        <i className="bi bi-funnel-fill me-2 text-primary"></i> Filter by Registered User
                    </label>
                    <select
                        className="form-select form-select-lg border-2 shadow-none"
                        style={{ borderRadius: "10px", borderColor: "#e0e0e0", fontSize: "0.95rem" }}
                        value={selectedEmail}
                        onChange={handleUserChange}
                    >
                        <option value="">Select User Email Address...</option>
                        {users.map((user, index) => (
                            <option key={index} value={user.email}>
                                {user.email} {user.name ? `(${user.name})` : ""}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Status Loaders */}
            {(loadingUsers || loadingRequests) && (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {/* Empty State Notification */}
            {!loadingRequests && selectedEmail && requests.length === 0 && (
                <div className="text-center py-5 rounded-4 bg-white shadow-sm border-0 border-start border-4 border-info">
                    <i className="bi bi-folder-x text-info display-4 mb-3 d-block"></i>
                    <h5 className="fw-bold text-dark">No Requests Found</h5>
                    <p className="text-muted mb-0">This user hasn't submitted any repair tickets yet.</p>
                </div>
            )}

            {/* Request Grid */}
            <div className="row g-4">
                {requests.map((request) => (
                    <div key={request.repairId} className="col-12 col-md-6 col-xl-4">
                        <div
                            className="card shadow-sm border-0 h-100 rounded-4 position-relative overflow-hidden transition-all"
                            style={{
                                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                cursor: "pointer",
                                backgroundColor: "#ffffff"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                                e.currentTarget.style.boxShadow = "0 1rem 3rem rgba(0,0,0,0.12)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 .125rem .25rem rgba(0,0,0,0.075)";
                            }}
                        >
                            {/* Accent indicator line on top */}
                            <div style={{ height: "4px", ...getStatusStyle(request.status) }}></div>

                            <div className="card-body p-4 d-flex flex-column justify-content-between">
                                <div>
                                    {/* Badges Container */}
                                    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                                        <span
                                            className="badge px-3 py-2 rounded-pill fw-bold text-uppercase shadow-xs"
                                            style={getStatusStyle(request.status)}
                                        >
                                            {request.status}
                                        </span>
                                        {request.warrantyMonths > 0 && (
                                            <span className="badge px-3 py-2 rounded-pill fw-semibold text-white shadow-xs" style={{ background: "linear-gradient(135deg, #11998e, #38ef7d)" }}>
                                                <i className="bi bi-shield-check me-1"></i> {request.warrantyMonths} Mo. Warranty
                                            </span>
                                        )}
                                    </div>

                                    {/* User Details */}
                                    <h5 className="fw-bold text-dark mb-1">{request.userName}</h5>
                                    <p className="text-muted small mb-1">
                                        <i className="bi bi-envelope me-2"></i>{request.userEmail}
                                    </p>
                                    <p className="text-dark font-monospace mb-3" style={{ fontSize: "0.9rem" }}>
                                        <i className="bi bi-telephone-fill me-2 text-primary"></i>{request.contactNumber}
                                    </p>

                                    <hr className="my-3 opacity-25" />

                                    {/* Meta Fields */}
                                    <div className="bg-light p-3 rounded-3 mb-3">
                                        <div className="row g-2 mb-2">
                                            <div className="col-6">
                                                <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}>Brand</small>
                                                <span className="fw-bold text-dark">{request.laptopBrand}</span>
                                            </div>
                                            <div className="col-6">
                                                <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}>Model</small>
                                                <span className="fw-bold text-dark text-truncate d-block">{request.laptopModel}</span>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Problem Description */}
                                    <div className="mb-3">
                                        <label className="text-muted text-uppercase fw-bold d-block mb-1" style={{ fontSize: "0.75rem" }}>Issue Description</label>
                                        <p className="mb-0 text-dark bg-white border border-light p-2 rounded" style={{ fontSize: "0.9rem", borderLeft: "3px solid #ff416c !important" }}>
                                            {request.issueDescription}
                                        </p>
                                    </div>

                                    {/* Delivery Address */}
                                    <div className="mb-3">
                                        <label className="text-muted text-uppercase fw-bold d-block mb-1" style={{ fontSize: "0.75rem" }}>Delivery Address</label>
                                        <p className="mb-0 text-secondary small">
                                            <i className="bi bi-geo-alt-fill text-danger me-1"></i> {request.address}
                                        </p>
                                    </div>

                                    {/* Admin Remarks */}
                                    <div className="mb-2">
                                        <label className="text-muted text-uppercase fw-bold d-block mb-1" style={{ fontSize: "0.75rem" }}>Admin Remarks</label>
                                        <p className={`mb-0 small p-2 rounded ${request.adminRemarks ? 'bg-warning-subtle text-warning-dominant fw-medium' : 'text-muted italic bg-light'}`}>
                                            <i className="bi bi-chat-square-dots-fill me-2 text-secondary"></i>
                                            {request.adminRemarks || "No Remarks added yet."}
                                        </p>
                                    </div>
                                </div>

                                {/* Timestamp Footer */}
                                <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center text-muted" style={{ fontSize: "0.75rem" }}>
                                    <span><i className="bi bi-calendar3 me-1"></i> {request.createdDate ? new Date(request.createdDate).toLocaleDateString("en-IN") : "N/A"}</span>
                                    <span><i className="bi bi-clock me-1"></i> {request.createdDate ? new Date(request.createdDate).toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' }) : ""}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllRequestBySelectedUser;