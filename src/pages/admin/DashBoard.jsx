import { useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
    const { backendURL } = useContext(AppContext);

    const [loading, setLoading] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);
    const [allRequests, setAllRequests] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [usersRes, requestsRes] = await Promise.all([
                axios.get(`${backendURL}/admin/get-all-users`),
                axios.get(`${backendURL}/admin/get-all-request`)
            ]);

            setTotalUsers(usersRes.data.length);
            setAllRequests(requestsRes.data);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Performance Optimization: Compute all filter arrays/counts in one pass
    const stats = useMemo(() => {
        let pending = 0;
        let accepted = 0;
        let inProgress = 0;
        let completed = 0;
        let rejected = 0;

        allRequests.forEach((req) => {
            switch (req.status) {
                case "PENDING": pending++; break;
                case "ACCEPTED": accepted++; break;
                case "IN_PROGRESS":
                case "INPROGRESS": inProgress++; break;
                case "COMPLETED": completed++; break;
                case "REJECTED": rejected++; break;
                default: break;
            }
        });

        const latestPending = allRequests
            .filter((req) => req.status === "PENDING")
            .sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate))
            .slice(0, 6);

        return { pending, accepted, inProgress, completed, rejected, latestPending };
    }, [allRequests]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
                <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid px-4 py-4 bg-light min-vh-100">
            {/* Embedded Custom CSS Enhancements */}
            <style>{`
                .custom-stat-card {
                    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease;
                    border-radius: 16px !important;
                }
                .custom-stat-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
                }
                .request-item-card {
                    transition: all 0.2s ease-in-out;
                    border-radius: 14px !important;
                    background: #ffffff;
                }
                .request-item-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08) !important;
                }
                .text-line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;  
                    overflow: hidden;
                }
                .bg-gradient-primary { background: linear-gradient(135deg, #4f46e5, #6366f1); }
                .bg-gradient-dark { background: linear-gradient(135deg, #1e293b, #334155); }
                .bg-gradient-warning { background: linear-gradient(135deg, #f59e0b, #d97706); }
                .bg-gradient-info { background: linear-gradient(135deg, #0ea5e9, #0284c7); }
                .bg-gradient-success { background: linear-gradient(135deg, #10b981, #059669); }
                .bg-gradient-danger { background: linear-gradient(135deg, #ef4444, #dc2626); }
            `}</style>

            {/* Header */}
            <div className="mb-4">
                <h2 className="fw-black text-dark mb-1" style={{ letterSpacing: "-0.5px" }}>Admin Dashboard</h2>
                <p className="text-muted mb-0">Real-time breakdown of operations and user inquiries.</p>
            </div>

            {/* Main Overview Counters */}
            <div className="row g-3 mb-4">
                <div className="col-12 col-md-6 col-lg-3">
                    <div className="card custom-stat-card border-0 bg-gradient-primary text-white h-100 shadow-sm">
                        <div className="card-body d-flex align-items-center p-4">
                            <div className="bg-white bg-opacity-20 rounded-3 p-3 me-3 text-center" style={{ minWidth: "60px" }}>
                                <span className="fs-3">👥</span>
                            </div>
                            <div>
                                <span className="text-white text-opacity-75 text-uppercase fw-bold small tracking-wider d-block mb-1">Total Registered</span>
                                <h2 className="fw-black mb-0">{totalUsers} Users</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <div className="card custom-stat-card border-0 bg-gradient-dark text-white h-100 shadow-sm">
                        <div className="card-body d-flex align-items-center p-4">
                            <div className="bg-white bg-opacity-20 rounded-3 p-3 me-3 text-center" style={{ minWidth: "60px" }}>
                                <span className="fs-3">📋</span>
                            </div>
                            <div>
                                <span className="text-white text-opacity-75 text-uppercase fw-bold small tracking-wider d-block mb-1">Total Inquiries</span>
                                <h2 className="fw-black mb-0">{allRequests.length} Tickets</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Breakdown Dynamic Box Grid */}
            <h5 className="fw-bold text-secondary mb-3">Status Categories</h5>
            <div className="row g-3 mb-5">
                {[
                    { title: "Pending Tickets", count: stats.pending, gradient: "bg-gradient-warning", icon: "⏳" },
                    { title: "Accepted Requests", count: stats.accepted, gradient: "bg-gradient-info", icon: "🤝" },
                    { title: "In Progress", count: stats.inProgress, gradient: "bg-gradient-primary", icon: "⚙️" },
                    { title: "Completed Task", count: stats.completed, gradient: "bg-gradient-success", icon: "✅" },
                    { title: "Rejected / Void", count: stats.rejected, gradient: "bg-gradient-danger", icon: "❌" }
                ].map((item, idx) => (
                    <div className="col-6 col-md-4 col-xl" key={idx}>
                        <div className={`card custom-stat-card border-0 ${item.gradient} text-white shadow-sm h-100`}>
                            <div className="card-body p-3 d-flex flex-column justify-content-between">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="small fw-semibold text-white text-opacity-80">{item.title}</span>
                                    <span className="small">{item.icon}</span>
                                </div>
                                <h3 className="fw-black mb-0">{item.count}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Panel: Pending Items Container */}
            <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
                <div className="card-header bg-white border-bottom border-light py-3 d-flex align-items-center justify-content-between px-4">
                    <h5 className="mb-0 fw-bold text-dark d-flex align-items-center">
                        <span className="spinner-grow text-warning me-2" style={{ width: "12px", height: "12px" }} role="status"></span>
                        Latest Pending Requests
                    </h5>
                    <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill fw-bold small">
                        Needs Action ({stats.latestPending.length})
                    </span>
                </div>

                <div className="card-body bg-light bg-opacity-50 p-4">
                    {stats.latestPending.length === 0 ? (
                        <div className="text-center py-5 bg-white rounded-3 border border-dashed">
                            <span className="fs-1 d-block mb-2">🎉</span>
                            <p className="text-muted mb-0 fw-medium">All clear! No current pending repair tickets.</p>
                        </div>
                    ) : (
                        <div className="row g-3">
                            {stats.latestPending.map((request) => (
                                <div key={request.repairId} className="col-12 col-md-6 col-xl-4">
                                    <div className="card request-item-card border-0 shadow-sm h-100">
                                        <div className="card-body p-4 d-flex flex-column justify-content-between">

                                            {/* Client Brief Header */}
                                            <div>
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <h5 className="fw-bold text-dark mb-0 text-truncate" style={{ maxWidth: '75%' }}>
                                                        {request.userName || "Anonymous"}
                                                    </h5>
                                                    <span className="badge bg-warning text-dark px-2.5 py-1 rounded-pill small fw-bold tracking-wide" style={{ fontSize: '0.7rem' }}>
                                                        PENDING
                                                    </span>
                                                </div>
                                                <p className="text-muted small mb-1 text-truncate">{request.userEmail}</p>
                                                <p className="small text-dark mb-3 fw-medium">
                                                    <span className="text-muted me-1">📞</span> {request.contactNumber || "No phone"}
                                                </p>

                                                <hr className="my-3 opacity-25" />

                                                {/* System Specs Badge Cluster */}
                                                <div className="bg-light rounded-3 p-3 mb-3 border border-light-subtle">
                                                    <div className="row g-2 text-center">
                                                        <div className="col-6 border-end border-light-subtle">
                                                            <small className="text-muted d-block text-uppercase tracking-wider" style={{ fontSize: '0.65rem' }}>Brand</small>
                                                            <span className="fw-bold text-dark small text-truncate d-block">{request.laptopBrand || "—"}</span>
                                                        </div>
                                                        <div className="col-6">
                                                            <small className="text-muted d-block text-uppercase tracking-wider" style={{ fontSize: '0.65rem' }}>Model</small>
                                                            <span className="fw-bold text-dark small text-truncate d-block">{request.laptopModel || "—"}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Problem Log Area */}
                                                <div className="mb-3">
                                                    <small className="text-muted d-block mb-1 fw-bold text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>Issue Described:</small>
                                                    <div className="p-2.5 rounded bg-warning bg-opacity-10 text-dark small border-start border-3 border-warning text-line-clamp-2">
                                                        {request.issueDescription || "No notes submitted."}
                                                    </div>
                                                </div>

                                                {/* Logistics Address */}
                                                <div className="mb-2">
                                                    <small className="text-muted d-block mb-1 fw-bold text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>Pickup Point:</small>
                                                    <p className="small text-secondary mb-0 text-line-clamp-2">
                                                        📍 {request.address || "No logistics information found."}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Precise Stamp Footers */}
                                            <div className="mt-4 pt-3 border-top border-light-subtle d-flex justify-content-between text-muted" style={{ fontSize: '0.75rem' }}>
                                                <span>📅 {request.createdDate ? new Date(request.createdDate).toLocaleDateString("en-IN") : "N/A"}</span>
                                                <span>⏰ {request.createdDate ? new Date(request.createdDate).toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' }) : ""}</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;