import { Outlet } from "react-router-dom";

import AdminNavbar from "../components/admin/AdminNavbar.jsx";
import AdminSidebar from "../components/admin/AdminSideBar.jsx";

const UserLayout = () => {
    return (
        <div className="bg-light min-vh-100">
            <AdminNavbar />

            <div className="d-flex mt-3 px-3 gap-3">

                <AdminSidebar/>

                <div
                    className="flex-grow-1 bg-white rounded-4 shadow-sm p-4"
                >
                    <Outlet />
                </div>

            </div>
        </div>
    );
};

export default UserLayout;
