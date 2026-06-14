const DashboardStats = ({ requests }) => {

    const totalRequests = requests.length;

    const pendingRequests = requests.filter(
        r => r.status === "PENDING"
    ).length;

    const inProgressRequests = requests.filter(
        r =>
            r.status === "ACCEPTED" ||
            r.status === "IN_PROGRESS"
    ).length;

    const completedRequests = requests.filter(
        r => r.status === "COMPLETED"
    ).length;

    return (
        <div className="row g-3 mb-4">

            <div className="col-md-3">
                <div className="card shadow-sm border-0">
                    <div className="card-body text-center">
                        <h3>{totalRequests}</h3>
                        <p>Total Requests</p>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow-sm border-0">
                    <div className="card-body text-center">
                        <h3>{pendingRequests}</h3>
                        <p>Pending</p>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow-sm border-0">
                    <div className="card-body text-center">
                        <h3>{inProgressRequests}</h3>
                        <p>In Progress</p>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow-sm border-0">
                    <div className="card-body text-center">
                        <h3>{completedRequests}</h3>
                        <p>Completed</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardStats;