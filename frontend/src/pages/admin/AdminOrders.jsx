import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get("/admin/orders");

            console.log("ADMIN ORDERS:", response.data);

            setOrders(response.data.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, status) => {
        try {
            await api.put(`/admin/orders/${orderId}/status`, {
                status: status,
            });

            alert("Order status updated successfully!");

            fetchOrders();
        } catch (error) {
            console.error(error.response?.data);

            alert(
                error.response?.data?.message ||
                error.response?.data?.errors?.status?.[0] ||
                "Failed to update status"
            );
        }
    };

    if (loading) {
        return (
            <div className="container py-5">
                Loading orders...
            </div>
        );
    }

    return (
        <div className="container py-5">

            <h2 className="mb-4">
                Manage Orders 📦
            </h2>
            

            {orders.length === 0 ? (
                <div className="alert alert-info">
                    No orders found.
                </div>
            ) : (
                <div className="table-responsive">
                    

                    <table className="table table-bordered table-hover align-middle">

                        <thead className="table-dark">
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Update Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {orders.map((order) => (

                                <tr key={order.id}>

                                    <td>
                                        #{order.id}
                                    </td>

                                    <td>
                                        {order.user?.name || "Customer"}
                                    </td>

                                    <td>
                                        {order.items?.map((item) => (
                                            <div key={item.id}>
                                                {item.product?.name}
                                                {" × "}
                                                {item.quantity}
                                            </div>
                                        ))}
                                    </td>

                                    <td>
                                        <strong>
                                            $
                                            {Number(
                                                order.total_amount
                                            ).toFixed(2)}
                                        </strong>
                                    </td>

                                    <td>
                                        <span
                                            className={`badge ${
                                                order.status === "cancelled"
                                                    ? "bg-danger"
                                                    : order.status === "delivered"
                                                    ? "bg-success"
                                                    : order.status === "shipped"
                                                    ? "bg-primary"
                                                    : order.status === "confirmed"
                                                    ? "bg-info text-dark"
                                                    : "bg-warning text-dark"
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                    <td>

                                        <select
                                            className="form-select"
                                            value={order.status}
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>

                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() =>
                                                navigate(`/admin/orders/${order.id}`)
                                            }
                                        >
                                            View
                                        </button>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
}

export default AdminOrders;