import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cancelling, setCancelling] = useState(false);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        try {
            const response = await api.get(`/orders/${id}`);
            setOrder(response.data.data);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to load order details."
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

    const handleCancel = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmed) return;

        try {
            setCancelling(true);

            await api.put(`/orders/${order.id}/cancel`);

            alert("Order cancelled successfully!");

            await fetchOrder();
        } catch (err) {
            console.error(err);

            alert(
                err.response?.data?.message ||
                "Failed to cancel order."
            );
        } finally {
            setCancelling(false);
        }
    };

    // ================= LOADING =================

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div
                    className="spinner-border text-primary"
                    role="status"
                ></div>

                <p className="text-muted mt-3">
                    Loading order details...
                </p>
            </div>
        );
    }

    // ================= ERROR =================

    if (error) {
        return (
            <div className="container py-5">

                <div className="alert alert-danger">
                    {error}
                </div>

                <button
                    className="btn btn-outline-dark"
                    onClick={() => navigate("/orders")}
                >
                    ← Back to Orders
                </button>

            </div>
        );
    }

    if (!order) {
        return null;
    }

    // ================= CALCULATIONS =================

    const totalQuantity =
        order.items?.reduce(
            (sum, item) =>
                sum + Number(item.quantity),
            0
        ) || 0;

    return (
        <>
            {/* ================= HEADER ================= */}

            <section className="bg-dark text-white py-5">

                <div className="container">

                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                        <div>

                            <p className="mb-1 text-white-50">
                                Order Details
                            </p>

                            <h1 className="fw-bold mb-2">
                                Order #{order.id}
                            </h1>

                            <p className="mb-0 text-white-50">
                                {new Date(
                                    order.created_at
                                ).toLocaleString()}
                            </p>

                        </div>


                        <div className="text-md-end">

                            <span
                                className={`badge fs-6 px-4 py-2 text-capitalize ${getStatusClass(
                                    order.status
                                )}`}
                            >
                                {order.status}
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= CONTENT ================= */}

            <section className="py-5 bg-light">

                <div className="container">

                    {/* Back Button */}

                    <button
                        className="btn btn-outline-dark mb-4"
                        onClick={() => navigate("/orders")}
                    >
                        ← Back to Orders
                    </button>


                    <div className="row g-4">

                        {/* ================= ORDER ITEMS ================= */}

                        <div className="col-lg-8">

                            <div className="card border-0 shadow-sm">

                                <div className="card-header bg-white py-3">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <h4 className="fw-bold mb-0">
                                            Order Items
                                        </h4>

                                        <span className="text-muted">
                                            {order.items?.length || 0} product(s)
                                        </span>

                                    </div>

                                </div>


                                <div className="card-body p-0">

                                    <div className="table-responsive">

                                        <table className="table align-middle mb-0">

                                            <thead className="table-light">

                                                <tr>
                                                    <th className="ps-4">
                                                        Product
                                                    </th>

                                                    <th>
                                                        Price
                                                    </th>

                                                    <th>
                                                        Quantity
                                                    </th>

                                                    <th>
                                                        Subtotal
                                                    </th>
                                                </tr>

                                            </thead>


                                            <tbody>

                                                {order.items?.map(
                                                    (item) => (

                                                        <tr key={item.id}>

                                                            {/* Product */}

                                                            <td className="ps-4">

                                                                <div className="d-flex align-items-center gap-3">

                                                                    {item.product?.image ? (

                                                                        <img
                                                                            src={
                                                                                item.product.image.startsWith(
                                                                                    "http"
                                                                                )
                                                                                    ? item.product.image
                                                                                    : `http://127.0.0.1:8000/storage/${item.product.image}`
                                                                            }
                                                                            alt={
                                                                                item.product?.name ||
                                                                                "Product"
                                                                            }
                                                                            width="80"
                                                                            height="80"
                                                                            className="rounded border"
                                                                            style={{
                                                                                objectFit:
                                                                                    "cover",
                                                                            }}
                                                                        />

                                                                    ) : (

                                                                        <div
                                                                            className="bg-light border rounded d-flex align-items-center justify-content-center"
                                                                            style={{
                                                                                width:
                                                                                    "80px",
                                                                                height:
                                                                                    "80px",
                                                                            }}
                                                                        >
                                                                            📦
                                                                        </div>

                                                                    )}

                                                                    <div>

                                                                        <h6 className="fw-bold mb-1">
                                                                            {item.product?.name ||
                                                                                "Product"}
                                                                        </h6>

                                                                        <small className="text-muted">
                                                                            Product ID:{" "}
                                                                            {item.product?.id ||
                                                                                "-"}
                                                                        </small>

                                                                    </div>

                                                                </div>

                                                            </td>


                                                            {/* Price */}

                                                            <td>

                                                                $
                                                                {Number(
                                                                    item.price
                                                                ).toFixed(
                                                                    2
                                                                )}

                                                            </td>


                                                            {/* Quantity */}

                                                            <td>

                                                                <span className="badge bg-light text-dark border px-3 py-2">
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </span>

                                                            </td>


                                                            {/* Subtotal */}

                                                            <td>

                                                                <span className="fw-bold text-primary">

                                                                    $
                                                                    {(
                                                                        Number(
                                                                            item.price
                                                                        ) *
                                                                        item.quantity
                                                                    ).toFixed(
                                                                        2
                                                                    )}

                                                                </span>

                                                            </td>

                                                        </tr>

                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                </div>

                            </div>


                            {/* ================= STATUS INFO ================= */}

                            <div className="card border-0 shadow-sm mt-4">

                                <div className="card-body p-4">

                                    <h4 className="fw-bold mb-4">
                                        Order Status
                                    </h4>

                                    <div className="row g-3">

                                        <div className="col-md-4">

                                            <div className="border rounded p-3 h-100">

                                                <small className="text-muted d-block mb-1">
                                                    Current Status
                                                </small>

                                                <span
                                                    className={`badge ${getStatusClass(
                                                        order.status
                                                    )} text-capitalize px-3 py-2`}
                                                >
                                                    {order.status}
                                                </span>

                                            </div>

                                        </div>


                                        <div className="col-md-4">

                                            <div className="border rounded p-3 h-100">

                                                <small className="text-muted d-block mb-1">
                                                    Order Date
                                                </small>

                                                <span className="fw-semibold">
                                                    {new Date(
                                                        order.created_at
                                                    ).toLocaleDateString()}
                                                </span>

                                            </div>

                                        </div>


                                        <div className="col-md-4">

                                            <div className="border rounded p-3 h-100">

                                                <small className="text-muted d-block mb-1">
                                                    Total Quantity
                                                </small>

                                                <span className="fw-semibold">
                                                    {totalQuantity}
                                                </span>

                                            </div>

                                        </div>

                                    </div>


                                    {/* Cancel pending order only */}

                                    {order.status === "pending" && (

                                        <div className="alert alert-warning mt-4 mb-0">

                                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                                                <div>

                                                    <h6 className="fw-bold mb-1">
                                                        Want to cancel?
                                                    </h6>

                                                    <p className="mb-0 small">
                                                        Pending orders can still
                                                        be cancelled.
                                                    </p>

                                                </div>

                                                <button
                                                    className="btn btn-danger"
                                                    onClick={
                                                        handleCancel
                                                    }
                                                    disabled={
                                                        cancelling
                                                    }
                                                >
                                                    {cancelling ? (
                                                        <>
                                                            <span
                                                                className="spinner-border spinner-border-sm me-2"
                                                                role="status"
                                                            ></span>

                                                            Cancelling...
                                                        </>
                                                    ) : (
                                                        "Cancel Order"
                                                    )}
                                                </button>

                                            </div>

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>


                        {/* ================= ORDER SUMMARY ================= */}

                        <div className="col-lg-4">

                            <div
                                className="card border-0 shadow-sm"
                                style={{
                                    position: "sticky",
                                    top: "20px",
                                }}
                            >

                                <div className="card-body p-4">

                                    <h4 className="fw-bold mb-4">
                                        Order Summary
                                    </h4>


                                    <div className="d-flex justify-content-between mb-3">

                                        <span className="text-muted">
                                            Order ID
                                        </span>

                                        <span className="fw-semibold">
                                            #{order.id}
                                        </span>

                                    </div>


                                    <div className="d-flex justify-content-between mb-3">

                                        <span className="text-muted">
                                            Products
                                        </span>

                                        <span>
                                            {order.items?.length || 0}
                                        </span>

                                    </div>


                                    <div className="d-flex justify-content-between mb-3">

                                        <span className="text-muted">
                                            Quantity
                                        </span>

                                        <span>
                                            {totalQuantity}
                                        </span>

                                    </div>


                                    <div className="d-flex justify-content-between mb-3">

                                        <span className="text-muted">
                                            Shipping
                                        </span>

                                        <span className="text-success fw-semibold">
                                            Free
                                        </span>

                                    </div>


                                    <div className="d-flex justify-content-between mb-3">

                                        <span className="text-muted">
                                            Status
                                        </span>

                                        <span
                                            className={`badge ${getStatusClass(
                                                order.status
                                            )} text-capitalize`}
                                        >
                                            {order.status}
                                        </span>

                                    </div>


                                    <hr />


                                    <div className="d-flex justify-content-between align-items-center mb-4">

                                        <h5 className="fw-bold mb-0">
                                            Total
                                        </h5>

                                        <h3 className="fw-bold text-primary mb-0">
                                            $
                                            {Number(
                                                order.total_amount
                                            ).toFixed(2)}
                                        </h3>

                                    </div>


                                    <button
                                        className="btn btn-primary w-100 mb-3"
                                        onClick={() =>
                                            navigate("/products")
                                        }
                                    >
                                        Continue Shopping
                                    </button>


                                    <button
                                        className="btn btn-outline-dark w-100"
                                        onClick={() =>
                                            navigate("/orders")
                                        }
                                    >
                                        View All Orders
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
        </>
    );
}

export default OrderDetail;