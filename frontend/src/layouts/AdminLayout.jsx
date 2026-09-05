import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

function AdminLayout() {
    return (
        <div>
            <AdminSidebar />

            <main
                style={{
                    marginLeft: "250px",
                    minHeight: "100vh",
                    backgroundColor: "#f5f6fa",
                }}
            >
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;