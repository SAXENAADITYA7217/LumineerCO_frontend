import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import UpdateStatusModal from "../../components/admin/UpdateStatusModal.jsx";

const CompletedRequests = () => {
    const { backendURL } = useContext(AppContext);

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const fetchCompletedRequests = async () => {
        try {
            const response = await axios.get(
                `${backendURL}/admin/get-request-by-status?status=COMPLETED`
            );

            const sortedData = response.data.sort(
                (a, b) => new Date(b.updatedDate) - new Date(a.updatedDate)
            );

            setRequests(sortedData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompletedRequests();
    }, []);

    const handleUpdateStatus = async (status, remarks, warrantyMonths) => {
        try {

            const response = await axios.put(
                `${backendURL}/admin/update-status/${selectedRequest.repairId}`,
                { status, remarks, warrantyMonths }
            );


            setShowModal(false);
            setSelectedRequest(null);

            fetchCompletedRequests();
        } catch (error) {

            alert("Failed to update request");
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-50 py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4">
            {/* Header section with Dark Green Success Theme */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-dark m-0">Completed Requests</h2>
                    <p className="text-muted m-0 small">History of successfully repaired devices</p>
                </div>
                <span className="badge bg-success text-white px-3 py-2 rounded-pill fw-bold fs-6">
                    Completed: {requests.length}
                </span>
            </div>

            {requests.length === 0 ? (
                <div className="alert alert-info border-0 shadow-sm p-4 text-center">
                    <strong>No Completed Requests Found</strong>
                    <p className="text-muted mb-0 small mt-1">Finished orders and closed tickets will appear here.</p>
                </div>
            ) : (
                <div className="row g-4">
                    {requests.map((request) => (
                        <div key={request.repairId} className="col-12 col-md-6 col-xl-4">
                            {/* Card with Dark Green Top Border to match "Completed" theme */}
                            <div className="card shadow-sm border-0 border-top border-success border-3 h-100">
                                <div className="card-body p-4 d-flex flex-column justify-content-between">

                                    <div>
                                        {/* Header Row */}
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h4 className="fw-bold text-primary mb-1 fs-5">
                                                    {request.userName}
                                                </h4>
                                                <div className="d-flex gap-1.5 align-items-center flex-wrap mt-1">
                                                    <span className="badge bg-success text-white fw-bold px-2 py-1 small">
                                                        {request.status}
                                                    </span>
                                                    <span className="badge bg-dark text-white fw-bold px-2 py-1 small">
                                                        🛡️ {request.warrantyMonths || 0} Mo Warranty
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                className="btn btn-outline-primary btn-sm px-3 rounded-pill fw-semibold shadow-sm"
                                                onClick={() => {
                                                    setSelectedRequest(request);
                                                    setShowModal(true);
                                                }}
                                            >
                                                ✏️ Update
                                            </button>
                                        </div>

                                        {/* Contact Info Block (15px Text Size) */}
                                        <div className="bg-light p-2.5 rounded mb-3 border" style={{ fontSize: '15px' }}>
                                            <div className="text-truncate text-muted mb-1">
                                                📧 {request.userEmail}
                                            </div>
                                            <div className="text-dark fw-semibold">
                                                📞 {request.contactNumber}
                                            </div>
                                        </div>

                                        {/* Device Details Box (15px Text Size) */}
                                        <div className="mb-3">
                                            <div className="row g-2 text-center bg-light p-2 rounded border mx-0" style={{ fontSize: '15px' }}>
                                                <div className="col-6 border-end">
                                                    <small className="text-muted d-block text-uppercase fw-semibold mb-1" style={{ fontSize: '11px' }}>Brand</small>
                                                    <span className="fw-bold text-dark">{request.laptopBrand}</span>
                                                </div>
                                                <div className="col-6">
                                                    <small className="text-muted d-block text-uppercase fw-semibold mb-1" style={{ fontSize: '11px' }}>Model</small>
                                                    <span className="fw-bold text-dark">{request.laptopModel}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* PROBLEM BOX (Highly Highlighted) */}
                                        <div className="alert alert-danger border-0 mb-3 p-3 rounded shadow-sm">
                                            <strong className="text-danger d-block mb-1 small fw-bold">
                                                ⚠️ Problem Reported:
                                            </strong>
                                            <p className="mb-0 text-dark fw-bold" style={{ fontSize: '15px', lineHeight: '1.4' }}>
                                                {request.issueDescription}
                                            </p>
                                        </div>

                                        {/* Address & Remarks (15px Font Size) */}
                                        <div className="mb-2" style={{ fontSize: '15px' }}>
                                            <div className="d-flex align-items-start mb-2">
                                                <span className="me-2">📍</span>
                                                <div>
                                                    <small className="text-muted d-block fw-bold" style={{ fontSize: '11px' }}>ADDRESS</small>
                                                    <span className="text-dark fw-medium">{request.address}</span>
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-start">
                                                <span className="me-2">💬</span>
                                                <div>
                                                    <small className="text-muted d-block fw-bold" style={{ fontSize: '11px' }}>ADMIN REMARKS</small>
                                                    <span className={`fw-medium ${request.adminRemarks ? 'text-dark' : 'text-muted fst-italic'}`}>
                                                        {request.adminRemarks || "No remarks left yet"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Date block */}
                                    <div className="mt-3 pt-2.5 border-top d-flex justify-content-between align-items-center text-muted" style={{ fontSize: '12px' }}>
                                        <span>📅 Received:</span>
                                        <span className="fw-semibold text-dark">
                                            {request.createdDate
                                                ? new Date(request.createdDate).toLocaleDateString("en-IN")
                                                : "N/A"}
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <UpdateStatusModal
                show={showModal}
                currentStatus={selectedRequest?.status}
                currentRemarks={selectedRequest?.adminRemarks}
                currentWarrantyMonths={selectedRequest?.warrantyMonths}
                onClose={() => {
                    setShowModal(false);
                    setSelectedRequest(null);
                }}
                onSubmit={handleUpdateStatus}
            />
        </div>
    );
};

export default CompletedRequests;