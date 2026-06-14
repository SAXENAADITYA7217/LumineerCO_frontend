import { useState } from 'react'

import './App.css'
import {ToastContainer} from "react-toastify";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";

import ResetPassword from "./pages/ResetPassword.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import UserRoute from "./routes/UserRoute.jsx";
import GuestRoute from "./routes/GuestRoute.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
import Dashboard from "./pages/user/DashBoard.jsx";
import NewRequests from "./pages/user/NewRequests.jsx";
import AllRequests from "./pages/user/AllRequests.jsx";
import WarrantyService from "./pages/user/WarrantyService.jsx";
import RejectRequests from "./pages/user/RejectRequests.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import DashBoard from "./pages/admin/DashBoard.jsx";
import AllUsers from "./pages/admin/AllUsers.jsx";
import AllRequest from "./pages/admin/AllRequest.jsx";
import PendingRequest from "./pages/admin/PendingRequest.jsx";
import AcceptedRequests from "./pages/admin/AcceptedRequests.jsx";
import InProgressRequests from "./pages/admin/InProgressRequests.jsx";
import CompletedRequests from "./pages/admin/CompletedRequests.jsx";
import AllRequestBySelectedUser from "./pages/admin/AllRequestBySelectedUser.jsx";
import RejectedRequest from "./pages/admin/RejectedRequest.jsx";




function App() {


  return (
    <div>
      <ToastContainer/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<GuestRoute>
                <Login />
            </GuestRoute>}/>

            <Route path="/reset-password" element={<ResetPassword/>}/>
            <Route
                path="/user-dashboard"
                element={
                    <UserRoute>
                        <UserLayout />
                    </UserRoute>
                }
            >
                <Route index element={<Dashboard />} />

                <Route
                    path="new-request"
                    element={<NewRequests />}
                />

                <Route
                    path="all-requests"
                    element={<AllRequests />}
                />

                <Route
                    path="warranty-requests"
                    element={<WarrantyService />}
                />
                <Route
                    path="rejected-requests"
                    element={<RejectRequests/>}
                />


            </Route>

            <Route
                path="/admin-dashboard"
                element={
                    <AdminRoute>
                        <AdminLayout />
                    </AdminRoute>
                }
            >
                {/* Dashboard */}
                <Route index element={<DashBoard />} />

                {/* Users */}
                <Route
                    path="all-users"
                    element={<AllUsers />}
                />

                {/* Requests */}
                <Route
                    path="all-requests"
                    element={<AllRequest />}
                />

                <Route
                    path="pending-requests"
                    element={<PendingRequest/>}
                />

                <Route
                    path="accept-requests"
                    element={<AcceptedRequests />}
                />

                <Route
                    path="inprogress-requests"
                    element={<InProgressRequests />}
                />

                <Route
                    path="complete-requests"
                    element={<CompletedRequests />}
                />
                <Route
                    path="rejected-requests"
                    element={<RejectedRequest />}
                />

                <Route
                    path="all-requests-byselecteduser"
                    element={<AllRequestBySelectedUser />}
                />
            </Route>

            {/* Invalid Route */}
            <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

    </div>
  )
}

export default App
