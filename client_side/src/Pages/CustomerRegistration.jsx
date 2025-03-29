import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function CustomerRegistration() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({}); // Store validation errors
    const navigate = useNavigate();

    // Email validation function
    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    // Password validation function (at least 6 characters, 1 number, 1 special character)
    const isValidPassword = (password) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);

    // Handle input changes and validate in real-time
    const handleInputChange = (field, value) => {
        if (field === "email") {
            setEmail(value);
            setErrors({ ...errors, email: isValidEmail(value) ? "" : "Enter a valid email" });
        } else if (field === "password") {
            setPassword(value);
            setErrors({
                ...errors,
                password: isValidPassword(value)
                    ? ""
                    : "At least 6 characters, 1 number, 1 special character",
            });
        } else if (field === "name") {
            setName(value);
        } else if (field === "lastName") {
            setLastName(value);
        }
    };

    // Function to show toast notifications
    const showToast = (icon, title) => {
        Swal.fire({
            toast: true,
            position: "top-right",
            icon: icon,
            title: title,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    };

    const handleSubmit = async () => {
        if (!name || !lastName || !email || !password) {
            return showToast("error", "All fields are required!");
        }

        if (errors.email || errors.password) {
            return showToast("error", "Please fix validation errors before submitting.");
        }

        setLoading(true);
        showToast("info", "Sending Verification Email...");

        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", {
                email,
                password,
                name,
                lastName,
                role: "customer",
            });

            if (response.status === 200) {
                showToast("success", "Registration successful! Please verify your email.");
                setEmail("");
                setName("");
                setPassword("");
                setLastName("");
                navigate("/login");
            }
        } catch (error) {
            showToast("error", error.response?.data?.message || "Error signing up");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: "25px" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                            Customer Registration
                                        </p>
                                        <form className="mx-1 mx-md-4">
                                            <div className="mb-3">
                                                <label className="form-label">First Name</label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    className="form-control"
                                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Last Name</label>
                                                <input
                                                    type="text"
                                                    value={lastName}
                                                    className="form-control"
                                                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Your Email</label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                />
                                                {errors.email && (
                                                    <small className="text-danger">{errors.email}</small>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    value={password}
                                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                                />
                                                {errors.password && (
                                                    <small className="text-danger">{errors.password}</small>
                                                )}
                                            </div>
                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <label className="form-check-label">
                                                    Already a user? <Link to="/login">Login</Link>
                                                    <div>
                                                    Want to register as Admin? <Link to="/">Click Here</Link>
                                                    </div>
                                                </label>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-lg"
                                                    onClick={handleSubmit}
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <span
                                                            className="spinner-border spinner-border-sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                        ></span>
                                                    ) : (
                                                        "Register"
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid"
                                            alt="Sample"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CustomerRegistration;
