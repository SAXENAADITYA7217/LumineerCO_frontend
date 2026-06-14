import { useContext, useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

import { AppContext } from "../../context/AppContext";
import EmptyState from "../../components/user/dashboard/EmptyState";
import RepairRequestCard from "../../components/user/dashboard/RepairRequestCard";

const RejectRequests = () => {

    const { backendURL } = useContext(AppContext);

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRejectedRequests = async () => {

        try {

            const response = await axios.get(
                `${backendURL}/user/my-requests`,
                {
                    withCredentials: true
                }
            );

            const rejectedRequests = response.data
                .filter(
                    request =>
                        request.status === "REJECTED"
                )
                .sort((a, b) => b.id - a.id);

            setRequests(rejectedRequests);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRejectedRequests();
    }, []);

    if (loading) {
        return (
            <div className="container mt-4 text-center">
                <h4>Loading Rejected Requests...</h4>
            </div>
        );
    }

    return (
        <div className="container-fluid">

            <div className="mb-4">

                <h2 className="fw-bold text-danger">
                    Rejected Requests
                </h2>

                <p className="text-muted">
                    All repair requests rejected by admin
                </p>

            </div>

            {requests.length === 0 ? (

                <EmptyState />

            ) : (

                <div className="row g-4">

                    {requests.map((request) => (

                        <div
                            key={request.id}
                            className="col-lg-6"
                        >

                            <RepairRequestCard
                                request={request}
                            />

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default RejectRequests;