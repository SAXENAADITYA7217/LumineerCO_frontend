const EmptyState = () => {

    return (
        <div className="card border-0 shadow-sm">

            <div className="card-body text-center py-5">

                <h4>No Repair Requests Found</h4>

                <p className="text-muted">
                    Submit your first repair request.
                </p>

            </div>

        </div>
    );
};

export default EmptyState;