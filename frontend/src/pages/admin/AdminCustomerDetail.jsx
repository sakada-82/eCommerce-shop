import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

function AdminCustomerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCustomer();
    }, [id]);

    const fetchCustomer = async () => {
        try {
            setLoading(true);

            const response = await api.get(
                `/admin/customers/${id}`
            );

            setCustomer(response.data.data);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to load customer."
            );
        } finally {
            setLoading(false);
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
                Loading customer...
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
                    onClick={() =>
                        navigate("/admin/customers")
                    }
                >
                    Back
                </button>
            </div>
        );
    }

    if (!customer) return null;

    return (
        <div className="container py-5">

            <button
                className="btn btn-secondary mb-4"
                onClick={() =>
                    navigate("/admin/customers")
                }
            >
                ← Back to Customers
            </button>

            <h2 className="mb-4">
                Customer Details 👤
            </h2>

            {/* Customer Info */}
            <div className="card mb-4">

                <div className="card-header">
                    <strong>Customer Information</strong>
                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6">
                            <p>
                                <strong>ID:</strong>{" "}
                                #{customer.id}
                            </p>

                            <p>
                                <strong>Name:</strong>{" "}
                                {customer.name}
                            </p>

                            <p>
                                <strong>Email:</strong>{" "}
                                {customer.email}
                            </p>
                        </div>

                        <div className="col-md-6">
                            <p>
                                <strong>Registered:</strong>{" "}
                                {new Date(
                                    customer.created_at
                                ).toLocaleDateString()}
                            </p>

                            <p>
                                <strong>Total Orders:</strong>{" "}
                                {customer.total_orders}
                            </p>

                            <p>
                                <strong>Total Spent:</strong>{" "}
                                <span className="text-success fw-bold">
                                    $
                                    {Number(
                                        customer.total_spent
                                    ).toFixed(2)}
                                </span>
                            </p>
                        </div>

                    </div>

                </div>
            </div>

            {/* Order History */}
            <div className="card">

                <div className="card-header">
                    <strong>Order History 📦</strong>
                </div>

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-bordered table-hover align-middle">

                            <thead className="table-dark">
                                <tr>
                                    <th>Order</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {customer.orders?.length > 0 ? (
                                    customer.orders.map((order) => (

                                        <tr key={order.id}>

                                            <td>
                                                #{order.id}
                                            </td>

                                            <td>
                                                $
                                                {Number(
                                                    order.total_amount
                                                ).toFixed(2)}
                                            </td>

                                            <td>
                                                <span
                                                    className={`badge ${getStatusClass(
                                                        order.status
                                                    )}`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>

                                            <td>
                                                {new Date(
                                                    order.created_at
                                                ).toLocaleDateString()}
                                            </td>

                                            <td>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/orders/${order.id}`
                                                        )
                                                    }
                                                >
                                                    View Order
                                                </button>
                                            </td>

                                        </tr>

                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center"
                                        >
                                            No orders found.
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>
            </div>

        </div>
    );
}

export default AdminCustomerDetail;