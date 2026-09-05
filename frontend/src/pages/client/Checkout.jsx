import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Checkout() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await api.get("/cart");
            setCart(response.data.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const total =
        cart?.items?.reduce(
            (sum, item) =>
                sum +
                Number(item.product.price) * item.quantity,
            0
        ) || 0;

    const handleCheckout = async () => {
        try {
            setProcessing(true);

            const response = await api.post("/checkout");

            console.log("CHECKOUT RESPONSE:", response.data);

            alert("Order created successfully!");

            navigate("/orders");
        } catch (error) {
            console.error("Checkout error:", error);

            alert(
                error.response?.data?.message ||
                "Checkout failed"
            );
        } finally {
            setProcessing(false);
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
                    Loading checkout...
                </p>
            </div>
        );
    }

    // ================= EMPTY CART =================

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <>
                <section className="bg-dark text-white py-5">
                    <div className="container text-center py-4">
                        <h1 className="fw-bold">
                            Checkout
                        </h1>

                        <p className="mb-0">
                            Complete your order
                        </p>
                    </div>
                </section>

                <div className="container py-5 text-center">
                    <div
                        className="mb-3"
                        style={{ fontSize: "80px" }}
                    >
                        🛒
                    </div>

                    <h3 className="fw-bold">
                        Your Cart is Empty
                    </h3>

                    <p className="text-muted">
                        Add some products before checkout.
                    </p>

                    <button
                        className="btn btn-primary px-4 mt-2"
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        Continue Shopping
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            {/* ================= HEADER ================= */}

            <section className="bg-dark text-white py-5">
                <div className="container text-center py-4">

                    <h1 className="fw-bold">
                        Checkout
                    </h1>

                    <p className="mb-0">
                        Review your order before confirming
                    </p>

                </div>
            </section>

            {/* ================= CHECKOUT CONTENT ================= */}

            <section className="py-5 bg-light">

                <div className="container">

                    <div className="row g-4">

                        {/* ================= ORDER ITEMS ================= */}

                        <div className="col-lg-8">

                            <div className="card border-0 shadow-sm">

                                <div className="card-header bg-white py-3">

                                    <h4 className="fw-bold mb-0">
                                        Order Items
                                    </h4>

                                </div>

                                <div className="card-body">

                                    {cart.items.map((item) => (

                                        <div
                                            key={item.id}
                                            className="row align-items-center border-bottom py-3"
                                        >

                                            {/* Image */}
                                            <div className="col-md-2">

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
                                                            item.product.name
                                                        }
                                                        width="80"
                                                        height="80"
                                                        style={{
                                                            objectFit:
                                                                "cover",
                                                        }}
                                                        className="rounded"
                                                    />

                                                ) : (

                                                    <div
                                                        className="bg-light d-flex align-items-center justify-content-center rounded"
                                                        style={{
                                                            width:
                                                                "80px",
                                                            height:
                                                                "80px",
                                                        }}
                                                    >
                                                        No Image
                                                    </div>

                                                )}

                                            </div>

                                            {/* Name */}
                                            <div className="col-md-4">

                                                <h6 className="fw-bold mb-1">
                                                    {
                                                        item.product
                                                            .name
                                                    }
                                                </h6>

                                                <small className="text-muted">
                                                    $
                                                    {Number(
                                                        item.product
                                                            .price
                                                    ).toFixed(2)}
                                                    {" "}each
                                                </small>

                                            </div>

                                            {/* Quantity */}
                                            <div className="col-md-2">

                                                <span className="badge bg-light text-dark border">
                                                    Qty:{" "}
                                                    {
                                                        item.quantity
                                                    }
                                                </span>

                                            </div>

                                            {/* Price */}
                                            <div className="col-md-4 text-end">

                                                <span className="fw-bold text-primary">

                                                    $
                                                    {(
                                                        Number(
                                                            item
                                                                .product
                                                                .price
                                                        ) *
                                                        item.quantity
                                                    ).toFixed(
                                                        2
                                                    )}

                                                </span>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>


                            {/* ================= ORDER INFO ================= */}

                            <div className="card border-0 shadow-sm mt-4">

                                <div className="card-body p-4">

                                    <h4 className="fw-bold mb-3">
                                        Order Information
                                    </h4>

                                    <div className="alert alert-light border mb-0">

                                        <div className="d-flex gap-3">

                                            <div
                                                style={{
                                                    fontSize:
                                                        "30px",
                                                }}
                                            >
                                                📦
                                            </div>

                                            <div>

                                                <h6 className="fw-bold">
                                                    Order Process
                                                </h6>

                                                <p className="text-muted mb-0">
                                                    After confirming
                                                    your order, it
                                                    will be created
                                                    with a pending
                                                    status. You can
                                                    view its progress
                                                    from your Orders
                                                    page.
                                                </p>

                                            </div>

                                        </div>

                                    </div>

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
                                            Products
                                        </span>

                                        <span>
                                            {cart.items.length}
                                        </span>

                                    </div>

                                    <div className="d-flex justify-content-between mb-3">

                                        <span className="text-muted">
                                            Total Quantity
                                        </span>

                                        <span>
                                            {cart.items.reduce(
                                                (
                                                    sum,
                                                    item
                                                ) =>
                                                    sum +
                                                    item.quantity,
                                                0
                                            )}
                                        </span>

                                    </div>

                                    <div className="d-flex justify-content-between mb-3">

                                        <span className="text-muted">
                                            Subtotal
                                        </span>

                                        <span className="fw-semibold">
                                            $
                                            {total.toFixed(
                                                2
                                            )}
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

                                    <hr />

                                    <div className="d-flex justify-content-between align-items-center mb-4">

                                        <h5 className="fw-bold mb-0">
                                            Total
                                        </h5>

                                        <h3 className="fw-bold text-primary mb-0">
                                            $
                                            {total.toFixed(
                                                2
                                            )}
                                        </h3>

                                    </div>

                                    {/* Confirm */}
                                    <button
                                        className="btn btn-success btn-lg w-100 mb-3"
                                        onClick={
                                            handleCheckout
                                        }
                                        disabled={
                                            processing
                                        }
                                    >
                                        {processing ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                ></span>

                                                Processing...
                                            </>
                                        ) : (
                                            "Confirm Order"
                                        )}
                                    </button>

                                    {/* Back Cart */}
                                    <button
                                        className="btn btn-outline-dark w-100"
                                        onClick={() =>
                                            navigate(
                                                "/cart"
                                            )
                                        }
                                        disabled={
                                            processing
                                        }
                                    >
                                        Back to Cart
                                    </button>

                                    <p className="text-muted text-center small mt-3 mb-0">
                                        By confirming,
                                        you agree to place
                                        this order.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
        </>
    );
}

export default Checkout;