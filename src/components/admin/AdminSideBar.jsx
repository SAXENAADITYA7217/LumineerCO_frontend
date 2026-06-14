import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";

const SidebarLinks = ({ isMobile }) => {
    // Mobile par click hone par offcanvas ko explicitly close karne ke liye function
    const handleLinkClick = () => {
        if (isMobile) {
            const offcanvasElement = document.getElementById("userSidebar");
            if (offcanvasElement) {
                // eslint-disable-next-line no-undef
                const bootstrapOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                if (bootstrapOffcanvas) {
                    bootstrapOffcanvas.hide();
                } else {
                    // Agar instance nahi mila toh button click simulate karke close karein
                    const closeBtn = offcanvasElement.querySelector(".btn-close");
                    if (closeBtn) closeBtn.click();
                }
            }
        }
    };

    const getLinkClass = (isActive, baseColor = "indigo") => {
        const activeStyles = baseColor === "danger"
            ? "bg-danger text-white shadow-sm"
            : "bg-primary text-white shadow-sm";
        const inactiveStyles = baseColor === "danger"
            ? "text-danger bg-danger-subtle hover-danger"
            : "text-secondary bg-light hover-primary";

        return `btn text-start d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 fw-medium border-0 transition-all ${
            isActive ? activeStyles : inactiveStyles
        }`;
    };

    return (
        <div className="d-flex flex-column gap-2">
            <NavLink
                to="/admin-dashboard"
                end
                className={({ isActive }) => getLinkClass(isActive)}
                onClick={handleLinkClick}
            >
                <span className="fs-5">📊</span> Dashboard
            </NavLink>



            <NavLink
                to="/admin-dashboard/pending-requests"
                className={({ isActive }) => getLinkClass(isActive)}
                onClick={handleLinkClick}
            >
                <span className="fs-5">⏳</span> New Requests
            </NavLink>

            <NavLink
                to="/admin-dashboard/accept-requests"
                className={({ isActive }) => getLinkClass(isActive)}
                onClick={handleLinkClick}
            >
                <span className="fs-5">✅</span> Accepted Requests
            </NavLink>

            <NavLink
                to="/admin-dashboard/inprogress-requests"
                className={({ isActive }) => getLinkClass(isActive)}
                onClick={handleLinkClick}
            >
                <span className="fs-5">🔧</span> In Progress Requests
            </NavLink>

            <NavLink
                to="/admin-dashboard/complete-requests"
                className={({ isActive }) => getLinkClass(isActive)}
                onClick={handleLinkClick}
            >
                <span className="fs-5">🎉</span> Completed Requests
            </NavLink>


            <NavLink to="/admin-dashboard/rejected-requests" className={({ isActive }) => getLinkClass(isActive, "danger")} onClick={handleLinkClick}>
                <span className="fs-5">❌</span> Rejected Requests
            </NavLink>


            <NavLink
                to="/admin-dashboard/all-requests-byselecteduser"
                className={({ isActive }) => getLinkClass(isActive)}
                onClick={handleLinkClick}
            >
                <span className="fs-5">📂</span> Requests By User
            </NavLink>
            <NavLink
                to="/admin-dashboard/all-users"
                className={({ isActive }) => getLinkClass(isActive)}
                onClick={handleLinkClick}
            >
                <span className="fs-5">👥</span> All Users
            </NavLink>

            <NavLink
                to="/admin-dashboard/all-requests"
                className={({ isActive }) => getLinkClass(isActive)}
                onClick={handleLinkClick}
            >
                <span className="fs-5">📋</span> All Requests
            </NavLink>
        </div>
    );
};

const AdminSidebar = () => {
    const { userData } = useContext(AppContext);

    return (
        <>
            {/* Desktop Sidebar */}
            <div
                className="d-none d-md-flex flex-column bg-white shadow-sm p-4 rounded-4 border border-light-subtle"
                style={{ width: "280px", minHeight: "calc(100vh - 120px)" }}
            >
                <h6 className="text-uppercase tracking-wider text-muted fw-bold mb-3 small">
                    Main Menu
                </h6>

                <SidebarLinks isMobile={false} />

                {/* User Info */}
                <div className="mt-auto pt-3">
                    <div className="d-flex align-items-center gap-3 p-2 bg-light rounded-4 border">
                        <div
                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center shadow-sm fw-bold fs-5"
                            style={{ width: "48px", height: "48px" }}
                        >
                            {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div className="overflow-hidden">
                            <div className="fw-bold text-dark text-truncate">
                                {userData?.name || "User"}
                            </div>
                            <div className="text-muted text-truncate small" style={{ fontSize: "13px" }}>
                                {userData?.email || "No Email"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div
                className="offcanvas offcanvas-start border-0 shadow"
                tabIndex="-1"
                id="userSidebar"
                aria-labelledby="userSidebarLabel"
                style={{ width: "280px" }}
            >
                <div className="offcanvas-header border-b px-4 pt-4 pb-2">
                    <h5 className="offcanvas-title fw-bold text-primary" id="userSidebarLabel">
                        Lumineer CO
                    </h5>
                    <button type="button" className="btn-close shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div className="offcanvas-body d-flex flex-column px-4 pb-4">
                    <SidebarLinks isMobile={true} />

                    {/* User Info */}
                    <div className="mt-auto">
                        <div className="d-flex align-items-center gap-3 p-2 bg-light rounded-4 border">
                            <div
                                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center shadow-sm fw-bold fs-5"
                                style={{ width: "48px", height: "48px" }}
                            >
                                {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
                            </div>
                            <div className="overflow-hidden">
                                <div className="fw-bold text-dark text-truncate">
                                    {userData?.name || "User"}
                                </div>
                                <div className="text-muted text-truncate small" style={{ fontSize: "13px" }}>
                                    {userData?.email || "No Email"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminSidebar;