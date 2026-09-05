import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    if (user?.role === "customer") {
        return null;
    }

    const handleLogout = async () => {
        try {
            await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
        } catch (error) {
            console.error(error);
        }

        logout();
        navigate("/login");
    };

    return (
        <nav>
            <Link to="/products">Products</Link>

            {isAuthenticated ? (
                <>
                    <span>
                        Welcome, {user.name}
                    </span>

                    <span>
                        Role: {user.role}
                    </span>

                   

                    {/* Customer */}
                    {user.role === "customer" && (
                        <Link to="/customer/dashboard">
                            Customer Dashboard
                        </Link>
                    )}

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;