import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

function AdminOrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        try {
            setLoading(true);

            const response = await api.get(`/admin/orders/${id}`);

            setOrder(response.data.data);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to load order."
            );
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (status) => {
        try {
            setUpdating(true);

            await api.put(`/admin/orders/${id}/status`, {
                status,
            });

            alert("Order status updated successfully!");

            fetchOrder();
        } catch (err) {
            console.error(err);

            alert(
                err.response?.data?.message ||
                err.response?.data?.errors?.status?.[0] ||
                "Failed to update order status."
            );
        } finally {
            setUpdating(false);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "pending":
                return "bg-warning text-dark";
            case "confirmed":
                return "bg-primary";
            case "shipped":
                return "bg-info text-dark";
            case "delivered":
                return "bg-success";
            case "cancelled":
                return "bg-danger";
            default:
                return "bg-secondary";
        }
    };

    if (loading) {
        return (
            <div className="container py-5">
                Loading order...
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger">
                    {error}
                </div>

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/admin/orders")}
                >
                    Back
                </button>
            </div>
        );
    }

    if (!order) return null;

    return (
        <div className="container py-5">

            <button
                className="btn btn-secondary mb-4"
                onClick={() => navigate("/admin/orders")}
            >
                ← Back to Orders
            </button>

            <div className="d-flex justify-content-between align-items-start mb-4">

                <div>
                    <h2>Order #{order.id}</h2>

                    <p className="text-muted">
                        {new Date(order.created_at).toLocaleString()}
                    </p>
                </div>

                <span
                    className={`badge fs-6 ${getStatusClass(
                        order.status
                    )}`}
                >
                    {order.status}
                </span>

            </div>

            {/* Customer */}
            <div className="card mb-4">
                <div className="card-header">
                    <strong>Customer Information</strong>
                </div>

                <div className="card-body">
                    <p>
                        <strong>Name:</strong>{" "}
                        {order.user?.name || "-"}
                    </p>

                    <p className="mb-0">
                        <strong>Email:</strong>{" "}
                        {order.user?.email || "-"}
                    </p>
                </div>
            </div>

            {/* Status */}
            <div className="card mb-4">
                <div className="card-header">
                    <strong>Order Status</strong>
                </div>

                <div className="card-body">

                    <select
                        className="form-select"
                        value={order.status}
                        disabled={
                            updating ||
                            order.status === "delivered" ||
                            order.status === "cancelled"
                        }
                        onChange={(e) =>
                            updateStatus(e.target.value)
                        }
                    >
                        <option value="pending">
                            Pending
                        </option>

                        <option value="confirmed">
                            Confirmed
                        </option>

                        <option value="shipped">
                            Shipped
                        </option>

                        <option value="delivered">
                            Delivered
                        </option>

                        <option value="cancelled">
                            Cancelled
                        </option>
                    </select>

                </div>
            </div>

            {/* Products */}
            <div className="card">
                <div className="card-header">
                    <strong>Order Items</strong>
                </div>

                <div className="card-body">

                    <div className="table-responsive">
                        <table className="table align-middle">

                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>

                            <tbody>
                                {order.items?.map((item) => (
                                    <tr key={item.id}>

                                        <td>
                                            {item.product?.image ? (
                                                <img
                                                    src={
                                                        item.product.image.startsWith("http")
                                                            ? item.product.image
                                                            : `http://127.0.0.1:8000/storage/${item.product.image}`
                                                    }
                                                    alt={item.product.name}
                                                    width="70"
                                                    height="70"
                                                    style={{
                                                        objectFit: "cover",
                                                        borderRadius: "6px",
                                                    }}
                                                />
                                            ) : (
                                                "No Image"
                                            )}
                                        </td>

                                        <td>
                                            {item.product?.name ||
                                                "Product"}
                                        </td>

                                        <td>
                                            $
                                            {Number(
                                                item.price
                                            ).toFixed(2)}
                                        </td>

                                        <td>
                                            {item.quantity}
                                        </td>

                                        <td>
                                            <strong>
                                                $
                                                {(
                                                    Number(item.price) *
                                                    item.quantity
                                                ).toFixed(2)}
                                            </strong>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                    <hr />

                    <div className="text-end">
                        <h4>
                            Total: $
                            {Number(
                                order.total_amount
                            ).toFixed(2)}
                        </h4>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default AdminOrderDetail;