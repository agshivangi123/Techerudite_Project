import React, { useState } from 'react';
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!email || !password) {
            return Swal.fire("Email or Password or Name is not there")
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email: email,
                password: password,
            })
            //console.log(response)
            if (response.status === 200) {
                const { token, user } = response.data;  // Extract user and token
                // Swal.fire("User Found")
                setEmail("")
                setPassword("")
                localStorage.setItem("userToken", response.data.token)
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/dashboard")
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "info",
                    title: error.response?.data?.message || "Error logging in",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
                setEmail("")
                setPassword("")
            } else {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "info",
                    title: error.response?.data?.message || "Error logging in",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        }
    }

    const handleSignUpClick = () => {
        Swal.fire({
            title: "Choose Your Login Type",
            text: "Are you signing up as a Customer or Admin?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Customer",
            cancelButtonText: "Admin",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/customer");  // Redirect to Customer Login
            } else {
                navigate("/");  // Redirect to Admin Login
            }
        });
    };


    return (
        <section class="vh-100" style={{ backgroundColor: "#eee" }}>
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-lg-12 col-xl-11">
                        <div class="card text-black" style={{ borderRadius: "25px" }}>
                            <div class="card-body p-md-5">
                                <div class="row justify-content-center">
                                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                                        <form class="mx-1 mx-md-4">

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                    <input type="email" value={email} id="form3Example3c" class="form-control" onChange={(e) => setEmail(e.target.value)} />
                                                    <label class="form-label" for="form3Example3c">Your Email</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                    <input type="password" value={password} id="form3Example4c" class="form-control" onChange={(e) => setPassword(e.target.value)} />
                                                    <label class="form-label" for="form3Example4c" >Password</label>
                                                </div>
                                            </div>
                                            <div class="form-check d-flex justify-content-center mb-5">
                                                {/* <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" /> */}
                                                <p className="text-center mt-3">
                                                    Not a User?
                                                    <span
                                                        style={{ color: "blue", textDecoration: "underline", cursor: "pointer", marginLeft: "5px" }}
                                                        onClick={handleSignUpClick}
                                                    >
                                                        Sign Up
                                                    </span>
                                                </p>
                                            </div>
                                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg" onClick={handleSubmit}>Login</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            class="img-fluid" alt="Sample image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
