import React from "react";
import { Laptop } from "lucide-react";

const Footer = () => {
    return (
        <footer
            className="text-light py-5"
            style={{ backgroundColor: "#0b1a2b" }}
        >
            <div className="container">

                {/* Top Section */}
                <div className="row g-5">

                    {/* Left */}
                    <div className="col-md-4">
                        <div className="d-flex align-items-center gap-2 fs-4 fw-semibold text-white">
                            <Laptop size={28} />
                            <span>RepairPro</span>
                        </div>

                        <p className="mt-4 small lh-lg text-secondary">
                            Your trusted platform connecting customers with certified local
                            laptop repair vendors. Fast, reliable service with free pickup
                            and drop.
                        </p>

                        <p className="small text-secondary">
                            Verified Vendors • Secure Platform • 24/7 Support
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4">
                        <h5 className="text-white mb-4">Quick Links</h5>

                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-decoration-none text-secondary">
                                    Services
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-decoration-none text-secondary">
                                    How It Works
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-decoration-none text-secondary">
                                    Testimonials
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-decoration-none text-secondary">
                                    Register Complaint
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Popular Services */}
                    <div className="col-md-4">
                        <h5 className="text-white mb-4">Popular Services</h5>

                        <ul className="list-unstyled text-secondary">
                            <li className="mb-2">Screen Replacement</li>
                            <li className="mb-2">Data Recovery</li>
                            <li className="mb-2">Battery Replacement</li>
                            <li className="mb-2">Virus Removal</li>
                            <li className="mb-2">Hardware Upgrades</li>
                            <li>Performance Boost</li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-secondary my-5" />

                {/* Middle Section */}
                <div className="row g-5">

                    {/* Customers */}
                    <div className="col-md-4">
                        <h5 className="text-white mb-3">For Customers</h5>
                        <ul className="list-unstyled text-secondary">
                            <li className="mb-2">Register Complaint</li>
                            <li className="mb-2">Track Repair</li>
                            <li>Find Vendors</li>
                        </ul>
                    </div>

                    {/* Vendors */}
                    <div className="col-md-4">
                        <h5 className="text-white mb-3">For Vendors</h5>
                        <ul className="list-unstyled text-secondary">
                            <li className="mb-2">Join as Vendor</li>
                            <li className="mb-2">Vendor Dashboard</li>
                            <li>Certification</li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-md-4">
                        <h5 className="text-white mb-3">Support</h5>
                        <ul className="list-unstyled text-secondary">
                            <li className="mb-2">Help Center</li>
                            <li className="mb-2">FAQs</li>
                            <li>Contact Support</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <hr className="border-secondary my-4" />

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <p className="mb-3 mb-md-0 text-secondary">
                        © {new Date().getFullYear()} RepairPro. All rights reserved.
                    </p>

                    <div className="d-flex gap-4">
                        <a
                            href="#"
                            className="text-decoration-none text-secondary"
                        >
                            Privacy Policy
                        </a>

                        <a
                            href="#"
                            className="text-decoration-none text-secondary"
                        >
                            Terms of Service
                        </a>

                        <a
                            href="#"
                            className="text-decoration-none text-secondary"
                        >
                            Cookie Policy
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;