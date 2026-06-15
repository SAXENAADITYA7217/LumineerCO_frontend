import { useContext, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext.jsx";
import {useNavigate} from "react-router-dom";

const NewRequests = () => {
    const { backendURL } = useContext(AppContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        laptopBrand: "",
        laptopModel: "",
        issueDescription: "",
        contactNumber: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "contactNumber") {
            const numericValue = value.replace(/\D/g, "");

            if (numericValue.length <= 10) {
                setFormData((prev) => ({
                    ...prev,
                    [name]: numericValue,
                }));
            }
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^[0-9]{10}$/.test(formData.contactNumber)) {
            toast.error("Please enter a valid 10 digit mobile number");
            return;
        }
        setLoading(true);

        try {
            const response = await axios.post(
                `${backendURL}/user/repair-request`,
                formData,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200 || response.status === 201) {
                toast.success("Repair Request Submitted Successfully");

                setFormData({
                    laptopBrand: "",
                    laptopModel: "",
                    issueDescription: "",
                    contactNumber: "",
                    address: "",
                });
                navigate("/user-dashboard");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to submit repair request"
            );
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <div
                className="card border-0 shadow-lg rounded-4 overflow-hidden"
                style={{
                    background: "#ffffff",
                }}
            >
                {/* Header */}
                <div
                    className="text-white p-4"
                    style={{
                        background:
                            "linear-gradient(135deg, #A855F7, #6D28D9)",
                    }}
                >
                    <h2 className="fw-bold mb-1">
                        🔧 New Repair Request
                    </h2>
                    <p className="mb-0 opacity-75">
                        Submit your laptop repair request
                    </p>
                </div>

                {/* Form */}
                <div className="card-body p-4 p-md-5">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Laptop Brand */}
                            <div className="col-md-6 mb-4">
                                <label className="form-label fw-semibold">
                                    Laptop Brand
                                </label>

                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="e.g. Lenovo, HP, Dell"
                                    name="laptopBrand"
                                    value={formData.laptopBrand}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Laptop Model */}
                            <div className="col-md-6 mb-4">
                                <label className="form-label fw-semibold">
                                    Laptop Model
                                </label>

                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="e.g. IdeaPad Gaming 3"
                                    name="laptopModel"
                                    value={formData.laptopModel}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Issue Description */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold">
                                Issue Description
                            </label>

                            <textarea
                                className="form-control"
                                rows="5"
                                placeholder="Describe your laptop issue..."
                                name="issueDescription"
                                value={formData.issueDescription}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Contact Number */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold">
                                Contact Number
                            </label>

                            <input
                                type="tel"
                                className="form-control form-control-lg"
                                placeholder="Enter 10 digit mobile number"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                maxLength={10}
                                pattern="[0-9]{10}"
                                required
                            />

                            <small className="text-muted">
                                Only 10 digit mobile number is allowed.
                            </small>
                        </div>

                        {/* Address */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold">
                                Pickup Address
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder="Enter complete address..."
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn text-white fw-bold px-5 py-3 d-flex align-items-center justify-content-center"
                            style={{
                                background:
                                    "linear-gradient(135deg, #A855F7, #6D28D9)",
                                border: "none",
                                borderRadius: "14px",
                                boxShadow:
                                    "0 10px 25px rgba(124,58,237,0.3)",
                                minWidth: "220px",
                            }}
                        >
                            {loading ? (
                                <>
            <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
            ></span>
                                    Submitting...
                                </>
                            ) : (
                                "Submit Request 🚀"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewRequests;