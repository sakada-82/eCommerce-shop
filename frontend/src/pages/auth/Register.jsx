import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
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

            const response = await api.post("/register", form);

            console.log(response.data);

            navigate("/login");
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Register failed. Please try again."
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
                                <div className="col-md-5 bg-primary text-white">

                                    <div
                                        className="p-5 d-flex flex-column justify-content-center"
                                        style={{ minHeight: "650px" }}
                                    >
                                        <div
                                            className="mb-4"
                                            style={{ fontSize: "60px" }}
                                        >
                                            🛍️
                                        </div>

                                        <h2 className="fw-bold">
                                            Join Our Store
                                        </h2>

                                        <p className="mt-3">
                                            Create your account and enjoy
                                            a simple online shopping experience.
                                        </p>

                                        <div className="mt-4">
                                            <p className="mb-2">
                                                ✓ Browse all products
                                            </p>

                                            <p className="mb-2">
                                                ✓ Add products to cart
                                            </p>

                                            <p className="mb-2">
                                                ✓ Easy checkout
                                            </p>

                                            <p className="mb-0">
                                                ✓ View and track orders
                                            </p>
                                        </div>

                                        <hr className="my-4" />

                                        <p className="mb-2">
                                            Already have an account?
                                        </p>

                                        <Link
                                            to="/login"
                                            className="btn btn-outline-light"
                                        >
                                            Login
                                        </Link>
                                    </div>

                                </div>


                                {/* ================= RIGHT SIDE ================= */}
                                <div className="col-md-7 bg-white">

                                    <div
                                        className="p-5 d-flex flex-column justify-content-center"
                                        style={{ minHeight: "650px" }}
                                    >

                                        <div className="mb-4">
                                            <p className="text-primary fw-bold mb-1">
                                                CREATE ACCOUNT
                                            </p>

                                            <h2 className="fw-bold">
                                                Register
                                            </h2>

                                            <p className="text-muted">
                                                Enter your information to create
                                                a customer account.
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

                                            {/* Name */}
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">
                                                    Full Name
                                                </label>

                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control form-control-lg"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    placeholder="Enter your full name"
                                                    required
                                                />
                                            </div>


                                            {/* Email */}
                                            <div className="mb-3">
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
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">
                                                    Password
                                                </label>

                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control form-control-lg"
                                                    value={form.password}
                                                    onChange={handleChange}
                                                    placeholder="Enter password"
                                                    required
                                                />
                                            </div>


                                            {/* Confirm Password */}
                                            <div className="mb-4">
                                                <label className="form-label fw-semibold">
                                                    Confirm Password
                                                </label>

                                                <input
                                                    type="password"
                                                    name="password_confirmation"
                                                    className="form-control form-control-lg"
                                                    value={
                                                        form.password_confirmation
                                                    }
                                                    onChange={handleChange}
                                                    placeholder="Confirm password"
                                                    required
                                                />
                                            </div>


                                            {/* Register Button */}
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

                                                        Creating account...
                                                    </>
                                                ) : (
                                                    "Create Account"
                                                )}
                                            </button>

                                        </form>


                                        {/* Login Link */}
                                        <div className="text-center mt-4">

                                            <span className="text-muted">
                                                Already have an account?{" "}
                                            </span>

                                            <Link
                                                to="/login"
                                                className="text-primary fw-bold text-decoration-none"
                                            >
                                                Login Now
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

export default Register;