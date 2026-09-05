import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await api.get(`/products/${id}`);
            setProduct(response.data.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async () => {
        try {
            await api.post("/cart/items", {
                product_id: product.id,
                quantity: quantity,
            });

            alert("Product added to cart successfully!");

            navigate("/cart");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to add product to cart"
            );
        }
    };

    if (loading) {
        return <div className="container py-5">Loading...</div>;
    }

    if (!product) {
        return (
            <div className="container py-5">
                <h4>Product not found</h4>
            </div>
        );
    }

    return (
        <div className="container py-5">

            <button
                className="btn btn-secondary mb-4"
                onClick={() => navigate("/products")}
            >
                ← Back
            </button>

            <div className="row">

                {/* Image */}
                <div className="col-md-6">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="img-fluid rounded shadow"
                        style={{
                            width: "100%",
                            height: "450px",
                            objectFit: "cover"
                        }}
                    />
                </div>

                {/* Information */}
                <div className="col-md-6">

                    <h1>{product.name}</h1>

                    <p className="text-muted">
                        {product.description}
                    </p>

                    <h2 className="text-primary">
                        ${product.price}
                    </h2>

                    <p>
                        <strong>Stock:</strong> {product.stock}
                    </p>

                    <hr />

                    {/* Quantity */}
                    <div className="mb-3">
                        <label className="form-label">
                            Quantity
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            min="1"
                            max={product.stock}
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(Number(e.target.value))
                            }
                        />
                    </div>

                    <button
                        className="btn btn-primary btn-lg w-100"
                        onClick={addToCart}
                        disabled={product.stock <= 0}
                    >
                        {product.stock <= 0
                            ? "Out of Stock"
                            : "Add to Cart"}
                    </button>

                </div>

            </div>
        </div>
    );
}

export default ProductDetail;