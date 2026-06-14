import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import UpdateStatusModal from "../../components/admin/UpdateStatusModal";

const PendingRequest = () => {
    const { backendURL } = useContext(AppContext);

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const fetchPendingRequests = async () => {
        try {
            const response = await axios.get(
                `${backendURL}/admin/get-request-by-status?status=PENDING`
            );

            const sortedData = response.data.sort(
                (a, b) => new Date(b.updatedDate) - new Date(a.updatedDate)
            );

            setRequests(sortedData);
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    const handleUpdateStatus = async (status, remarks, warrantyMonths) => {
        try {

            const response = await axios.put(
                `${backendURL}/admin/update-status/${selectedRequest.repairId}`,
                { status, remarks, warrantyMonths }
            );


            setShowModal(false);
            setSelectedRequest(null);

            fetchPendingRequests();
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
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-dark m-0">Pending Requests</h2>
                    <p className="text-muted m-0 small">Manage and update active hardware repair tickets</p>
                </div>
                <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold">
                    Total: {requests.length}
                </span>
            </div>

            {requests.length === 0 ? (
                <div className="alert alert-info border-0 shadow-sm p-4 text-center">
                    <strong>No Pending Requests Found</strong>
                    <p className="text-muted mb-0 small mt-1">All caught up! Dynamic updates will appear here.</p>
                </div>
            ) : (
                <div className="row g-4">
                    {requests.map((request) => (
                        <div key={request.id} className="col-12 col-md-6 col-xl-4">
                            {/* Card with Warning Top Border */}
                            <div className="card shadow-sm border-0 border-top border-warning border-3 h-100">
                                <div className="card-body p-3.5 d-flex flex-column justify-content-between">

                                    <div>
                                        {/* Header Row */}
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h5 className="fw-bold text-primary mb-1 fs-5">
                                                    {request.userName}
                                                </h5>
                                                <span className="badge bg-warning text-dark fw-bold px-2 py-1 small">
                                                    {request.status}
                                                </span>
                                            </div>
                                            <button
                                                className="btn btn-primary btn-sm px-3 rounded-pill fw-semibold shadow-sm"
                                                onClick={() => {
                                                    setSelectedRequest(request);
                                                    setShowModal(true);
                                                }}
                                            >
                                                Update Status
                                            </button>
                                        </div>

                                        {/* Contact Info Block */}
                                        <div className="bg-light p-2.5 rounded mb-3 border small">
                                            <div className="text-truncate text-muted mb-1">
                                                📧 {request.userEmail}
                                            </div>
                                            <div className="text-dark fw-semibold">
                                                📞 {request.contactNumber}
                                            </div>
                                        </div>

                                        {/* Device Details Box */}
                                        <div className="mb-3">
                                            <div className="row g-2 text-center bg-light p-2 rounded border mx-0">
                                                <div className="col-6 border-end">
                                                    <small className="text-muted d-block text-uppercase fw-semibold mb-1" style={{ fontSize: '11px', trackingWider: '0.5px' }}>Brand</small>
                                                    <span className="fw-bold text-dark">{request.laptopBrand}</span>
                                                </div>
                                                <div className="col-6">
                                                    <small className="text-muted d-block text-uppercase fw-semibold mb-1" style={{ fontSize: '11px', trackingWider: '0.5px' }}>Model</small>
                                                    <span className="fw-bold text-dark">{request.laptopModel}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* PROBLEM BOX (Highlighted but Perfectly Sized) */}
                                        <div className="alert alert-danger border-0 mb-3 p-2.5 rounded shadow-sm">
                                            <strong className="text-danger d-block mb-1 small fw-bold">
                                                ⚠️ Problem Reported:
                                            </strong>
                                            <p className="mb-0 text-dark fw-semibold" style={{ fontSize: '14px', lineHeight: '1.4' }}>
                                                {request.issueDescription}
                                            </p>
                                        </div>

                                        {/* Address & Remarks */}
                                        <div className="mb-2" style={{ fontSize: '14px' }}>
                                            <div className="d-flex align-items-start mb-2">
                                                <span className="me-2">📍</span>
                                                <div>
                                                    <small className="text-muted d-block fw-bold" style={{ fontSize: '10px' }}>ADDRESS</small>
                                                    <span className="text-dark fw-medium">{request.address}</span>
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-start">
                                                <span className="me-2">💬</span>
                                                <div>
                                                    <small className="text-muted d-block fw-bold" style={{ fontSize: '10px' }}>ADMIN REMARKS</small>
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
                                                ? `${new Date(request.createdDate).toLocaleDateString("en-IN")} @ ${new Date(request.createdDate).toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' })}`
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
                onClose={() => {
                    setShowModal(false);
                    setSelectedRequest(null);
                }}
                onSubmit={handleUpdateStatus}
            />
        </div>
    );
};

export default PendingRequest;