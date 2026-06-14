import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { AppContext } from "../../context/AppContext";

import DashboardStats from "../../components/user/dashboard/DashboardStats";
import RepairRequestCard from "../../components/user/dashboard/RepairRequestCard";
import EmptyState from "../../components/user/dashboard/EmptyState";

const DashBoard = () => {

    const { backendURL } = useContext(AppContext);

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {

        try {

            const response = await axios.get(
                `${backendURL}/user/my-requests`,
                {
                    withCredentials: true
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
            request =>
                request.status !== "COMPLETED" &&
                request.status !== "REJECTED"
        )
        .sort((a, b) => b.id - a.id);

    const latestRequest =
        activeRequests.length > 0
            ? activeRequests[0]
            : null;

    const otherRequests =
        activeRequests.length > 1
            ? activeRequests.slice(1)
            : [];

    if (loading) {
        return (
            <div className="container-fluid py-5">
                <div className="text-center">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                    <p className="mt-3">
                        Loading Dashboard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4">

            {/* Welcome Card */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <h2 className="fw-bold mb-2">
                        Welcome Back 👋
                    </h2>

                    <p className="text-muted mb-0">
                        Track all your repair requests,
                        warranty services and repair status.
                    </p>

                </div>

            </div>

            {/* Stats */}

            <DashboardStats requests={requests} />

            {/* Empty State */}

            {activeRequests.length === 0 ? (

                <div className="card border-0 shadow-sm">

                    <div className="card-body">

                        <EmptyState />

                    </div>

                </div>

            ) : (

                <>
                    {/* Current Repair */}

                    {latestRequest && (

                        <div className="mb-5">

                            <div className="d-flex align-items-center mb-3">

                                <h3 className="fw-bold text-primary mb-0">
                                    🔥 Current Repair Request
                                </h3>

                            </div>

                            <div className="row">

                                <div className="col-lg-8">

                                    <RepairRequestCard
                                        request={latestRequest}
                                    />

                                </div>

                            </div>

                        </div>

                    )}

                    {/* Other Requests */}

                    {otherRequests.length > 0 && (

                        <div>

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <h3 className="fw-bold mb-0">
                                    📋 Other Active Requests
                                </h3>

                                <span className="badge bg-primary">
                                    {otherRequests.length}
                                </span>

                            </div>

                            <div className="row g-4">

                                {otherRequests.map((request) => (

                                    <div
                                        key={request.id}
                                        className="col-md-6 col-xl-4"
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

export default DashBoard;