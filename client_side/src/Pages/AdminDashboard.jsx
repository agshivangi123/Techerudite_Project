import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Logged out successfully",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        });
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            {/* Navbar */}
            <header className="navbar" float="right">
                <h2>Admin Dashboard</h2>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </header>

            {/* Sidebar */}
            <nav className="sidebar">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Settings</a></li>
                </ul>
            </nav>

            {/* Main Content */}
            <main className="content">
                <h1 className="welcome-text">
                    Welcome, <span className="username">{user.firstName || "Admin"}</span>!
                </h1>
            </main>
        </div>
    );
};

export default AdminDashboard;
