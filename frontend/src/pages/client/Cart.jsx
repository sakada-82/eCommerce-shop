import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await api.get("/cart");

            console.log("CART RESPONSE:", response.data);

            setCart(response.data.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) return;

        try {
            await api.put(`/cart/items/${itemId}`, {
                quantity: quantity,
            });

            fetchCart();
        } catch (error) {
            console.error("Update quantity error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to update quantity"
            );
        }
    };

    const deleteItem = async (itemId) => {
        const confirmed = window.confirm(
            "Are you sure you want to remove this product?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/cart/items/${itemId}`);

            fetchCart();
        } catch (error) {
            console.error("Delete error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to remove product"
            );
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
                    Loading cart...
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
                            Shopping Cart
                        </h1>

                        <p className="mb-0">
                            Review your selected products
                        </p>
                    </div>
                </section>

                <section className="py-5">
                    <div className="container text-center py-5">

                        <div
                            className="mb-3"
                            style={{ fontSize: "80px" }}
                        >
                            🛒
                        </div>

                        <h2 className="fw-bold">
                            Your Cart is Empty
                        </h2>

                        <p className="text-muted">
                            You haven't added any products
                            to your cart yet.
                        </p>

                        <button
                            className="btn btn-primary px-4 mt-2"
                            onClick={() =>
                                navigate("/products")
                            }
                        >
                            Start Shopping
                        </button>

                    </div>
                </section>
            </>
        );
    }


    // ================= TOTAL =================

    const total = cart.items.reduce(
        (sum, item) =>
            sum +
            Number(item.product.price) *
                item.quantity,
        0
    );


    return (
        <>
            {/* ================= HEADER ================= */}

            <section className="bg-dark text-white py-5">
                <div className="container text-center py-4">

                    <h1 className="fw-bold">
                        Shopping Cart
                    </h1>

                    <p className="mb-0">
                        Review your selected products
                        before checkout
                    </p>

                </div>
            </section>


            {/* ================= CART ================= */}

            <section className="py-5 bg-light">

                <div className="container">

                    <div className="row g-4">

                        {/* ================= CART ITEMS ================= */}

                        <div className="col-lg-8">

                            <div className="card border-0 shadow-sm">

                                <div className="card-header bg-white py-3">

                                    <h5 className="fw-bold mb-0">
                                        Cart Items
                                        {" "}
                                        <span className="text-muted">
                                            ({cart.items.length})
                                        </span>
                                    </h5>

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

                                                    <th>
                                                        Action
                                                    </th>
                                                </tr>

                                            </thead>


                                            <tbody>

                                                {cart.items.map(
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
                                                                                item.product?.name
                                                                            }
                                                                            width="85"
                                                                            height="85"
                                                                            style={{
                                                                                objectFit:
                                                                                    "cover",
                                                                                borderRadius:
                                                                                    "8px",
                                                                            }}
                                                                        />

                                                                    ) : (

                                                                        <div
                                                                            className="bg-light d-flex align-items-center justify-content-center"
                                                                            style={{
                                                                                width:
                                                                                    "85px",
                                                                                height:
                                                                                    "85px",
                                                                                borderRadius:
                                                                                    "8px",
                                                                            }}
                                                                        >
                                                                            No Image
                                                                        </div>

                                                                    )}

                                                                    <div>

                                                                        <h6 className="fw-bold mb-1">
                                                                            {
                                                                                item
                                                                                    .product
                                                                                    ?.name
                                                                            }
                                                                        </h6>

                                                                        <small className="text-muted">
                                                                            Stock:{" "}
                                                                            {
                                                                                item
                                                                                    .product
                                                                                    ?.stock
                                                                            }
                                                                        </small>

                                                                    </div>

                                                                </div>

                                                            </td>


                                                            {/* Price */}
                                                            <td>

                                                                <span className="fw-semibold">
                                                                    $
                                                                    {Number(
                                                                        item
                                                                            .product
                                                                            ?.price ||
                                                                            0
                                                                    ).toFixed(
                                                                        2
                                                                    )}
                                                                </span>

                                                            </td>


                                                            {/* Quantity */}
                                                            <td>

                                                                <div
                                                                    className="input-group"
                                                                    style={{
                                                                        width:
                                                                            "125px",
                                                                    }}
                                                                >

                                                                    <button
                                                                        className="btn btn-outline-secondary"
                                                                        onClick={() =>
                                                                            updateQuantity(
                                                                                item.id,
                                                                                item.quantity -
                                                                                    1
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            item.quantity <=
                                                                            1
                                                                        }
                                                                    >
                                                                        −
                                                                    </button>

                                                                    <input
                                                                        type="text"
                                                                        className="form-control text-center"
                                                                        value={
                                                                            item.quantity
                                                                        }
                                                                        readOnly
                                                                    />

                                                                    <button
                                                                        className="btn btn-outline-secondary"
                                                                        onClick={() =>
                                                                            updateQuantity(
                                                                                item.id,
                                                                                item.quantity +
                                                                                    1
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            item.quantity >=
                                                                            item
                                                                                .product
                                                                                ?.stock
                                                                        }
                                                                    >
                                                                        +
                                                                    </button>

                                                                </div>

                                                            </td>


                                                            {/* Subtotal */}
                                                            <td>

                                                                <span className="fw-bold text-primary">
                                                                    $
                                                                    {(
                                                                        Number(
                                                                            item
                                                                                .product
                                                                                ?.price ||
                                                                                0
                                                                        ) *
                                                                        item.quantity
                                                                    ).toFixed(
                                                                        2
                                                                    )}
                                                                </span>

                                                            </td>


                                                            {/* Delete */}
                                                            <td>

                                                                <button
                                                                    className="btn btn-outline-danger btn-sm"
                                                                    onClick={() =>
                                                                        deleteItem(
                                                                            item.id
                                                                        )
                                                                    }
                                                                >
                                                                    Remove
                                                                </button>

                                                            </td>

                                                        </tr>

                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* ================= ORDER SUMMARY ================= */}

                        <div className="col-lg-4">

                            <div className="card border-0 shadow-sm">

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
                                            Subtotal
                                        </span>

                                        <span className="fw-semibold">
                                            ${total.toFixed(2)}
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

                                        <h3 className="text-primary fw-bold mb-0">
                                            ${total.toFixed(2)}
                                        </h3>

                                    </div>


                                    <button
                                        className="btn btn-primary btn-lg w-100 mb-3"
                                        onClick={() =>
                                            navigate("/checkout")
                                        }
                                    >
                                        Proceed to Checkout
                                    </button>


                                    <button
                                        className="btn btn-outline-dark w-100"
                                        onClick={() =>
                                            navigate("/products")
                                        }
                                    >
                                        Continue Shopping
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

export default Cart;