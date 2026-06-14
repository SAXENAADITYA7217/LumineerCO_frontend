import { useEffect, useState } from "react";

const UpdateStatusModal = ({
                               show,
                               onClose,
                               onSubmit,
                               currentStatus,
                               currentRemarks,
                               currentWarrantyMonths,
                           }) => {
    const [status, setStatus] = useState("");
    const [remarks, setRemarks] = useState("");
    const [warrantyMonths, setWarrantyMonths] = useState("");

    useEffect(() => {
        if (show) {
            setStatus(currentStatus || "");
            setRemarks(currentRemarks || "");
            setWarrantyMonths(currentWarrantyMonths || "");
        }
    }, [
        show,
        currentStatus,
        currentRemarks,
        currentWarrantyMonths,
    ]);

    if (!show) return null;

    const handleSubmit = () => {
        if (
            status === "COMPLETED" &&
            (!warrantyMonths || Number(warrantyMonths) <= 0)
        ) {
            alert("Please enter warranty months");
            return;
        }

        onSubmit(
            status,
            remarks,
            status === "COMPLETED"
                ? Number(warrantyMonths)
                : null
        );
    };

    return (
        <div
            className="modal d-block"
            tabIndex="-1"
            style={{
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Update Request Status
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">
                                Status
                            </label>

                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                            >
                                <option value="">
                                    Select Status
                                </option>

                                <option value="PENDING">
                                    PENDING
                                </option>

                                <option value="ACCEPTED">
                                    ACCEPTED
                                </option>

                                <option value="IN_PROGRESS">
                                    IN_PROGRESS
                                </option>

                                <option value="COMPLETED">
                                    COMPLETED
                                </option>

                                <option value="REJECTED">
                                    REJECTED
                                </option>
                            </select>
                        </div>

                        {status === "COMPLETED" && (
                            <div className="mb-3">
                                <label className="form-label">
                                    Warranty Months
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    className="form-control"
                                    value={warrantyMonths}
                                    onChange={(e) =>
                                        setWarrantyMonths(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter warranty months"
                                />
                            </div>
                        )}

                        <div>
                            <label className="form-label">
                                Admin Remarks
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                value={remarks}
                                onChange={(e) =>
                                    setRemarks(e.target.value)
                                }
                                placeholder="Enter remarks..."
                            />
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateStatusModal;