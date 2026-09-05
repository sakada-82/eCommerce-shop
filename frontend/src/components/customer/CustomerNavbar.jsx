import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function CustomerNavbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const linkClass = ({ isActive }) =>
        isActive
            ? "nav-link active fw-bold"
            : "nav-link";

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    🛒 E-Commerce
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#customerNavbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="customerNavbar"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={linkClass}
                            >
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/about"
                                className={linkClass}
                            >
                                About
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/contact"
                                className={linkClass}
                            >
                                Contact
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/categories"
                                className={linkClass}
                            >
                                Categories
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/products"
                                className={linkClass}
                            >
                                Products
                            </NavLink>
                        </li>

                        {user?.role === "customer" && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        to="/cart"
                                        className={linkClass}
                                    >
                                        Cart
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink
                                        to="/orders"
                                        className={linkClass}
                                    >
                                        Orders
                                    </NavLink>
                                </li>
                            </>
                        )}

                    </ul>

                    <div className="d-flex align-items-center gap-2">

                        {!user ? (
                            <>
                                <Link
                                    to="/login"
                                    className="btn btn-outline-light"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="btn btn-primary"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <span className="text-white">
                                    Welcome, {user.name}
                                </span>

                                <button
                                    className="btn btn-danger"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        )}

                    </div>

                </div>
            </div>
        </nav>
    );
}

export default CustomerNavbar;