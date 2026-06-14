import { useContext, useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

import { AppContext } from "../../context/AppContext";
import RepairRequestCard from "../../components/user/dashboard/RepairRequestCard";
import EmptyState from "../../components/user/dashboard/EmptyState";

const AllRequests = () => {
    const { backendURL } = useContext(AppContext);

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchRequests = async () => {
        try {
            const response = await axios.get(
                `${backendURL}/user/my-requests`,
                {
                    withCredentials: true,
                }
            );

            setRequests(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const activeRequests = requests
        .filter(
            (request) =>
                request.status !== "COMPLETED" &&
                request.status !== "REJECTED"
        )
        .sort((a, b) => b.id - a.id);

    const closedRequests = requests
        .filter(
            (request) =>
                request.status === "COMPLETED" ||
                request.status === "REJECTED"
        )
        .sort((a, b) => b.id - a.id);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary"></div>
                <h5 className="mt-3">Loading Requests...</h5>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="mb-4">
                <h2 className="fw-bold">All Repair Requests</h2>
                <p className="text-muted">
                    View and track all your repair requests
                </p>
            </div>

            {requests.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    {/* Active Requests */}
                    {activeRequests.length > 0 && (
                        <div
                            className="p-4 mb-5 rounded-4"
                            style={{
                                border: "2px solid #a855f7",
                                background: "#faf5ff",
                            }}
                        >
                            <h3 className="mb-4 text-primary fw-bold">
                                🔥 Active Requests
                            </h3>

                            <div className="row g-4">
                                {activeRequests.map((request) => (
                                    <div
                                        key={request.id}
                                        className="col-xl-4 col-lg-6"
                                    >
                                        <RepairRequestCard
                                            request={request}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Closed Requests */}
                    {closedRequests.length > 0 && (
                        <div
                            className="p-4 rounded-4"
                            style={{
                                border: "2px solid #22c55e",
                                background: "#f0fdf4",
                            }}
                        >
                            <h3 className="mb-4 text-success fw-bold">
                                ✅ Closed Requests
                            </h3>

                            <div className="row g-4">
                                {closedRequests.map((request) => (
                                    <div
                                        key={request.id}
                                        className="col-xl-4 col-lg-6"
                                    >
                                        <RepairRequestCard
                                            request={request}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllRequests;