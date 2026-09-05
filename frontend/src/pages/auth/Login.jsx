import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);

            const response = await api.post("/login", form);

            const token = response.data.token;
            const user = response.data.user;

            login(user, token);

            // Redirect by role
            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else if (user.role === "customer") {
                navigate("/");
            }

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Login failed. Please check your email and password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-light py-5">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-10">

                        <div className="card border-0 shadow-lg overflow-hidden">

                            <div className="row g-0">

                                {/* ================= LEFT SIDE ================= */}

                                <div className="col-md-5 bg-dark text-white">

                                    <div
                                        className="p-5 d-flex flex-column justify-content-center"
                                        style={{ minHeight: "550px" }}
                                    >

                                        <div
                                            className="mb-4"
                                            style={{ fontSize: "60px" }}
                                        >
                                            🛒
                                        </div>

                                        <h2 className="fw-bold">
                                            Welcome Back!
                                        </h2>

                                        <p className="text-light mt-3">
                                            Login to your account and
                                            continue shopping with us.
                                        </p>

                                        <div className="mt-4">

                                            <p className="mb-2">
                                                ✓ Browse quality products
                                            </p>

                                            <p className="mb-2">
                                                ✓ Manage your shopping cart
                                            </p>

                                            <p className="mb-2">
                                                ✓ Track your orders
                                            </p>

                                            <p className="mb-0">
                                                ✓ Easy checkout
                                            </p>

                                        </div>

                                        <hr className="my-4" />

                                        <p className="mb-2">
                                            Don't have an account?
                                        </p>

                                        <Link
                                            to="/register"
                                            className="btn btn-outline-light"
                                        >
                                            Create Account
                                        </Link>

                                    </div>

                                </div>


                                {/* ================= RIGHT SIDE ================= */}

                                <div className="col-md-7 bg-white">

                                    <div
                                        className="p-5 d-flex flex-column justify-content-center"
                                        style={{ minHeight: "550px" }}
                                    >

                                        <div className="mb-4">

                                            <p className="text-primary fw-bold mb-1">
                                                WELCOME BACK
                                            </p>

                                            <h2 className="fw-bold">
                                                Login to Your Account
                                            </h2>

                                            <p className="text-muted">
                                                Enter your email and password
                                                to continue.
                                            </p>

                                        </div>


                                        {/* Error */}
                                        {error && (
                                            <div
                                                className="alert alert-danger"
                                                role="alert"
                                            >
                                                {error}
                                            </div>
                                        )}


                                        {/* Form */}
                                        <form onSubmit={handleSubmit}>

                                            {/* Email */}
                                            <div className="mb-4">

                                                <label className="form-label fw-semibold">
                                                    Email Address
                                                </label>

                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control form-control-lg"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    placeholder="example@gmail.com"
                                                    required
                                                />

                                            </div>


                                            {/* Password */}
                                            <div className="mb-4">

                                                <label className="form-label fw-semibold">
                                                    Password
                                                </label>

                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control form-control-lg"
                                                    value={form.password}
                                                    onChange={handleChange}
                                                    placeholder="Enter your password"
                                                    required
                                                />

                                            </div>


                                            {/* Login Button */}
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-lg w-100"
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                        ></span>

                                                        Logging in...
                                                    </>
                                                ) : (
                                                    "Login"
                                                )}
                                            </button>

                                        </form>


                                        {/* Register Link */}
                                        <div className="text-center mt-4">

                                            <span className="text-muted">
                                                Don't have an account?{" "}
                                            </span>

                                            <Link
                                                to="/register"
                                                className="text-primary fw-bold text-decoration-none"
                                            >
                                                Register Now
                                            </Link>

                                        </div>

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

export default Login;