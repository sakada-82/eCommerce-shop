import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminSidebar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const linkClass = ({ isActive }) =>
        `nav-link px-3 py-2 rounded mb-2 ${
            isActive
                ? "bg-primary text-white"
                : "text-white"
        }`;

    return (
        <div
            className="bg-dark text-white p-3"
            style={{
                width: "250px",
                minHeight: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
            }}
        >
            <h4 className="mb-4">
                🛒 E-Commerce
            </h4>

            <div className="nav flex-column">

                <NavLink
                    to="/admin/dashboard"
                    className={linkClass}
                >
                    📊 Dashboard
                </NavLink>

                <NavLink
                    to="/admin/products"
                    className={linkClass}
                >
                    📦 Products
                </NavLink>

                <NavLink
                    to="/admin/categories"
                    className={linkClass}
                >
                    📂 Categories
                </NavLink>

                <NavLink
                    to="/admin/orders"
                    className={linkClass}
                >
                    🧾 Orders
                </NavLink>

                <NavLink
                    to="/admin/customers"
                    className={linkClass}
                >
                    👥 Customers
                </NavLink>

            </div>

            <hr />

            <div className="mt-4">
                <p className="mb-1">
                    👤 {user?.name || "Admin"}
                </p>

                <small className="text-secondary">
                    {user?.email}
                </small>

                <button
                    className="btn btn-danger w-100 mt-3"
                    onClick={handleLogout}
                >
                    🚪 Logout
                </button>
            </div>
        </div>
    );
}

export default AdminSidebar;