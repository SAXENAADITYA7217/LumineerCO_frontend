import { Outlet } from "react-router-dom";
import UserNavbar from "../components/user/UserNavbar";
import UserSidebar from "../components/user/UserSideBar";

const UserLayout = () => {
    return (
        <div className="bg-light min-vh-100">
            <UserNavbar />

            <div className="d-flex mt-3 px-3 gap-3">

                <UserSidebar />

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
