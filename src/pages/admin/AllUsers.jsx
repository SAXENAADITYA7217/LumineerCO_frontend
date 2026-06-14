import { useContext, useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { AppContext } from "../../context/AppContext.jsx";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const { backendURL } = useContext(AppContext);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                `${backendURL}/admin/get-all-users`
            );
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Filter users on the fly based on search string
    const filteredUsers = users.filter((user) => {
        const name = user.name?.toLowerCase() || "";
        const email = user.email?.toLowerCase() || "";
        const search = searchTerm.toLowerCase();
        return name.includes(search) || email.includes(search);
    });

    // Helper to generate a consistent gradient color based on the user's name
    const getAvatarGradient = (name) => {
        const charCode = name ? name.charCodeAt(0) : 65;
        if (charCode % 4 === 0) return "linear-gradient(135deg, #7f00ff, #e100ff)";
        if (charCode % 4 === 1) return "linear-gradient(135deg, #00d2ff, #0066ff)";
        if (charCode % 4 === 2) return "linear-gradient(135deg, #11998e, #38ef7d)";
        return "linear-gradient(135deg, #ff416c, #ff4b2b)";
    };

    return (
        <div className="container-fluid py-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
            {/* Page Header */}
            <div className="d-flex align-items-center mb-4">
                <div className="p-2 bg-primary text-white rounded-3 me-3 shadow-sm d-flex align-items-center justify-content-center" style={{ width: "45px", height: "45px" }}>
                    <i className="bi bi-people-fill fs-5"></i>
                </div>
                <div>
                    <h2 className="fw-extrabold text-dark m-0" style={{ letterSpacing: "-0.5px" }}>User Directory</h2>
                    <p className="text-muted small m-0">Manage and browse through your registered system accounts</p>
                </div>
            </div>

            {/* Controls / Filter Card */}
            <div className="card shadow-sm border-0 mb-4 rounded-4">
                <div className="card-body p-3">
                    <div className="input-group input-group-lg border-0">
                        <span className="input-group-text bg-light border-0 text-muted" style={{ borderRadius: "10px 0 0 10px" }}>
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control bg-light border-0 shadow-none ps-2"
                            style={{ borderRadius: "0 10px 10px 0", fontSize: "0.95rem" }}
                            placeholder="Search users by name or email address..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content Table Container */}
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                <div className="card-body p-0">
                    {loading ? (
                        <div className="text-center py-5 my-4">
                            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                                <span className="visually-hidden">Loading users...</span>
                            </div>
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="text-center py-5 my-4">
                            <i className="bi bi-person-x text-muted display-4 d-block mb-3"></i>
                            <h5 className="fw-bold text-dark">No Registered Users</h5>
                            <p className="text-muted mb-0">We couldn't find matches matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0" style={{ minWidth: "600px" }}>
                                <thead className="table-light border-bottom border-light">
                                <tr>
                                    <th className="ps-4 py-3 text-secondary text-uppercase font-monospace fs-7" style={{ width: "80px", fontSize: "0.75rem" }}>Index</th>
                                    <th className="py-3 text-secondary text-uppercase font-monospace fs-7" style={{ fontSize: "0.75rem" }}>User Information</th>
                                    <th className="py-3 text-secondary text-uppercase font-monospace fs-7" style={{ fontSize: "0.75rem" }}>Email Account</th>
                                    <th className="pe-4 py-3 text-end text-secondary text-uppercase font-monospace fs-7" style={{ width: "120px", fontSize: "0.75rem" }}>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredUsers.map((user, index) => {
                                    const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : "?";
                                    return (
                                        <tr key={index} style={{ transition: "background-color 0.15s ease-in-out" }}>
                                            {/* Index Column */}
                                            <td className="ps-4 py-3 font-monospace text-muted fw-bold">
                                                #{String(index + 1).padStart(2, '0')}
                                            </td>

                                            {/* Profile Avatar & Name Info */}
                                            <td className="py-3">
                                                <div className="d-flex align-items-center">
                                                    <div
                                                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-xs me-3"
                                                        style={{
                                                            width: "42px",
                                                            height: "42px",
                                                            background: getAvatarGradient(user.name),
                                                            fontSize: "1.1rem",
                                                            letterSpacing: "0.5px"
                                                        }}
                                                    >
                                                        {firstLetter}
                                                    </div>
                                                    <div>
                                                        <h6 className="fw-bold text-dark mb-0">{user.name || "Anonymous User"}</h6>
                                                        <small className="text-muted-xs font-monospace text-uppercase" style={{ fontSize: "0.68rem", color: "#aaa" }}>Verified User</small>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Email Link Row */}
                                            <td className="py-3">
                                                <a
                                                    href={`mailto:${user.email}`}
                                                    className="text-decoration-none fw-medium text-secondary d-inline-flex align-items-center gap-1 hover-primary"
                                                >
                                                    <i className="bi bi-envelope-open text-muted small me-1"></i>
                                                    {user.email}
                                                </a>
                                            </td>

                                            {/* Default Active Status pill */}
                                            <td className="pe-4 py-3 text-end">
                                                    <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1.5 fw-bold font-monospace" style={{ fontSize: "0.75rem" }}>
                                                        ACTIVE
                                                    </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllUsers;