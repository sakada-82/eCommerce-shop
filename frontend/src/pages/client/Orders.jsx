import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Orders() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get("/orders");

            console.log("MY ORDERS:", response.data);

            setOrders(response.data.data || []);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to load orders."
            );
        } finally {
            setLoading(false);
        }
    };

    // ================= STATUS COLOR =================

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

    // ================= LOADING =================

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div
                    className="spinner-border text-primary"
                    role="status"
                ></div>

                <p className="text-muted mt-3">
                    Loading your orders...
                </p>
            </div>
        );
    }

    return (
        <>
            {/* ================= HEADER ================= */}

            <section className="bg-dark text-white py-5">
                <div className="container text-center py-4">

                    <h1 className="fw-bold">
                        My Orders
                    </h1>

                    <p className="mb-0">
                        View and track all of your orders
                    </p>

                </div>
            </section>


            {/* ================= ORDERS ================= */}

            <section className="py-5 bg-light">

                <div className="container">

                    {/* Top */}
                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>
                            <h3 className="fw-bold mb-1">
                                Order History
                            </h3>

                            <p className="text-muted mb-0">
                                You have {orders.length}{" "}
                                {orders.length === 1
                                    ? "order"
                                    : "orders"}
                            </p>
                        </div>

                        <button
                            className="btn btn-outline-primary"
                            onClick={() =>
                                navigate("/products")
                            }
                        >
                            Continue Shopping
                        </button>

                    </div>


                    {/* Error */}

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}


                    {/* ================= EMPTY ORDERS ================= */}

                    {!error && orders.length === 0 ? (

                        <div className="card border-0 shadow-sm">

                            <div className="card-body text-center py-5">

                                <div
                                    className="mb-3"
                                    style={{
                                        fontSize: "80px",
                                    }}
                                >
                                    📦
                                </div>

                                <h3 className="fw-bold">
                                    No Orders Yet
                                </h3>

                                <p className="text-muted">
                                    You haven't placed any
                                    orders yet.
                                </p>

                                <button
                                    className="btn btn-primary px-4"
                                    onClick={() =>
                                        navigate(
                                            "/products"
                                        )
                                    }
                                >
                                    Start Shopping
                                </button>

                            </div>

                        </div>

                    ) : (

                        /* ================= ORDER LIST ================= */

                        <div className="row g-4">

                            {orders.map((order) => {

                                const totalQuantity =
                                    order.items?.reduce(
                                        (sum, item) =>
                                            sum +
                                            Number(
                                                item.quantity
                                            ),
                                        0
                                    ) || 0;

                                return (
                                    <div
                                        className="col-12"
                                        key={order.id}
                                    >

                                        <div className="card border-0 shadow-sm">

                                            {/* Card Header */}

                                            <div className="card-header bg-white py-3">

                                                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                                                    <div>

                                                        <small className="text-muted">
                                                            Order
                                                        </small>

                                                        <h5 className="fw-bold mb-0">
                                                            #
                                                            {
                                                                order.id
                                                            }
                                                        </h5>

                                                    </div>


                                                    <div>

                                                        <small className="text-muted d-block">
                                                            Order Date
                                                        </small>

                                                        <span className="fw-semibold">
                                                            {new Date(
                                                                order.created_at
                                                            ).toLocaleDateString()}
                                                        </span>

                                                    </div>


                                                    <div>

                                                        <small className="text-muted d-block">
                                                            Total
                                                        </small>

                                                        <span className="fw-bold text-primary">
                                                            $
                                                            {Number(
                                                                order.total_amount
                                                            ).toFixed(
                                                                2
                                                            )}
                                                        </span>

                                                    </div>


                                                    <div>

                                                        <span
                                                            className={`badge ${getStatusClass(
                                                                order.status
                                                            )} px-3 py-2 text-capitalize`}
                                                        >
                                                            {
                                                                order.status
                                                            }
                                                        </span>

                                                    </div>

                                                </div>

                                            </div>


                                            {/* Card Body */}

                                            <div className="card-body p-4">

                                                <div className="row align-items-center g-4">

                                                    {/* Product Info */}

                                                    <div className="col-lg-7">

                                                        <h6 className="fw-bold mb-3">
                                                            Order Items
                                                        </h6>

                                                        {order.items?.length >
                                                        0 ? (

                                                            order.items
                                                                .slice(
                                                                    0,
                                                                    3
                                                                )
                                                                .map(
                                                                    (
                                                                        item
                                                                    ) => (

                                                                        <div
                                                                            key={
                                                                                item.id
                                                                            }
                                                                            className="d-flex align-items-center gap-3 mb-3"
                                                                        >

                                                                            {/* Image */}

                                                                            {item
                                                                                .product
                                                                                ?.image ? (

                                                                                <img
                                                                                    src={
                                                                                        item.product.image.startsWith(
                                                                                            "http"
                                                                                        )
                                                                                            ? item
                                                                                                  .product
                                                                                                  .image
                                                                                            : `http://127.0.0.1:8000/storage/${item.product.image}`
                                                                                    }
                                                                                    alt={
                                                                                        item
                                                                                            .product
                                                                                            ?.name
                                                                                    }
                                                                                    width="60"
                                                                                    height="60"
                                                                                    className="rounded border"
                                                                                    style={{
                                                                                        objectFit:
                                                                                            "cover",
                                                                                    }}
                                                                                />

                                                                            ) : (

                                                                                <div
                                                                                    className="bg-light border rounded d-flex justify-content-center align-items-center"
                                                                                    style={{
                                                                                        width:
                                                                                            "60px",
                                                                                        height:
                                                                                            "60px",
                                                                                    }}
                                                                                >
                                                                                    📦
                                                                                </div>

                                                                            )}


                                                                            {/* Product Name */}

                                                                            <div>

                                                                                <h6 className="mb-1">
                                                                                    {item
                                                                                        .product
                                                                                        ?.name ||
                                                                                        "Product"}
                                                                                </h6>

                                                                                <small className="text-muted">
                                                                                    Quantity:{" "}
                                                                                    {
                                                                                        item.quantity
                                                                                    }
                                                                                </small>

                                                                            </div>

                                                                        </div>

                                                                    )
                                                                )

                                                        ) : (

                                                            <p className="text-muted">
                                                                No
                                                                product
                                                                information.
                                                            </p>

                                                        )}


                                                        {/* More Items */}

                                                        {order.items
                                                            ?.length >
                                                            3 && (

                                                            <small className="text-muted">
                                                                +
                                                                {order
                                                                    .items
                                                                    .length -
                                                                    3}{" "}
                                                                more
                                                                product(s)
                                                            </small>

                                                        )}

                                                    </div>


                                                    {/* Summary */}

                                                    <div className="col-lg-3">

                                                        <div className="border-start ps-lg-4">

                                                            <p className="text-muted mb-1">
                                                                Products
                                                            </p>

                                                            <h6 className="fw-bold">
                                                                {order
                                                                    .items
                                                                    ?.length ||
                                                                    0}
                                                            </h6>


                                                            <p className="text-muted mb-1 mt-3">
                                                                Total
                                                                Quantity
                                                            </p>

                                                            <h6 className="fw-bold">
                                                                {
                                                                    totalQuantity
                                                                }
                                                            </h6>


                                                            <p className="text-muted mb-1 mt-3">
                                                                Status
                                                            </p>

                                                            <span
                                                                className={`badge ${getStatusClass(
                                                                    order.status
                                                                )} text-capitalize`}
                                                            >
                                                                {
                                                                    order.status
                                                                }
                                                            </span>

                                                        </div>

                                                    </div>


                                                    {/* Action */}

                                                    <div className="col-lg-2 text-lg-end">

                                                        <button
                                                            className="btn btn-primary w-100"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/orders/${order.id}`
                                                                )
                                                            }
                                                        >
                                                            View Details
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>
                    )}

                </div>

            </section>
        </>
    );
}

export default Orders;