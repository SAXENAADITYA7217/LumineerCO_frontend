import {useContext, useEffect, useState} from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import {AppContext} from "../../context/AppContext.jsx";

const AllRequest = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const {backendURL} = useContext(AppContext)

    const fetchRequests = async () => {
        try {
            const response = await axios.get(
                `${backendURL}/admin/get-all-request`
            );

            setRequests(response.data);
        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h2 className="mb-4 fw-bold">All Requests</h2>

            {requests.length === 0 ? (
                <div className="alert alert-info">
                    No requests found.
                </div>
            ) : (
                <div className="row g-4">
                    {requests.map((request) => (
                        <div
                            className="col-12 col-md-6 col-xl-4"
                            key={request.id}
                        >
                            <div
                                className="card border-0 shadow-sm h-100"
                                style={{
                                    borderRadius: "16px",
                                }}
                            >
                                <div className="card-body">
                                    {/* Top Section */}
                                    <div className="mb-3">
                                        <h5 className="fw-bold mb-1">
                                            {request.userName}
                                        </h5>

                                        <p className="text-muted mb-1">
                                            {request.userEmail}
                                        </p>

                                        <p className="mb-0">
                                            📞 {request.contactNumber}
                                        </p>
                                    </div>

                                    <hr />



                                    <div className="mb-2">
                                        <strong>Laptop Brand:</strong>{" "}
                                        {request.laptopBrand}
                                    </div>

                                    <div className="mb-2">
                                        <strong>Model:</strong>{" "}
                                        {request.laptopModel}
                                    </div>

                                    <div className="mb-2">
                                        <strong>Problem:</strong>
                                        <p className="mb-0 mt-1">
                                            {request.issueDescription}
                                        </p>
                                    </div>

                                    <div className="mb-2">
                                        <strong>Address:</strong>
                                        <p className="mb-0 mt-1">
                                            {request.address}
                                        </p>
                                    </div>

                                    <div className="mb-2">
                                        <strong>Status:</strong>{" "}
                                        <span
                                            className={`badge ${
                                                request.status === "PENDING"
                                                    ? "bg-warning text-dark"
                                                    : request.status ===
                                                    "ACCEPTED"
                                                        ? "bg-success"
                                                        : request.status ===
                                                        "COMPLETED"
                                                            ? "bg-primary"
                                                            : "bg-secondary"
                                            }`}
                                        >
                                            {request.status}
                                        </span>
                                    </div>

                                    <div className="mb-2">
                                        <strong>Warranty Status:</strong>{" "}
                                        {request.warrantyStatus}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Created Date:</strong>{" "}
                                        {request.createdDate
                                            ? new Date(request.createdDate).toLocaleString("en-IN", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                                hour12: true,
                                            })
                                            : "N/A"}
                                    </div>


                                    <div className="mb-2">
                                        <strong>Completion Date:</strong>{" "}
                                        {request.completionDate || "N/A"}
                                    </div>

                                    <div className="mb-2">
                                        <strong>Warranty Months:</strong>{" "}
                                        {request.warrantyMonths || "N/A"}
                                    </div>

                                    <div className="mb-2">
                                        <strong>Warranty End:</strong>{" "}
                                        {request.warrantyEndDate || "N/A"}
                                    </div>

                                    <hr />

                                    {/* Admin Remarks at End */}
                                    <div>
                                        <strong>Admin Remarks:</strong>
                                        <p className="mb-0 mt-1 text-muted">
                                            {request.adminRemarks ||
                                                "No remarks available"}
                                        </p>
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

export default AllRequest;