import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await api.get("/products");
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="container py-5">
                Loading products...
            </div>
        );
    }

    const handleDelete = async (id) => { 
        const confirmDelete = window.confirm( "Are you sure you want to delete this product?" );

        if (!confirmDelete) return;

        try {
            await api.delete(`/products/${id}`);

            alert("Product deleted successfully!");

            fetchProducts();
        } catch (err) {
            console.error(err);

            alert(
                err.response?.data?.message ||
                "Failed to delete product."
            );
        }
        };

    return (
        <div className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Manage Products 🛍️</h2>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/admin/products/add")}
                >
                    Add Product
                </button>
            </div>

            {products.length === 0 ? (
                <div className="alert alert-info">
                    No products found.
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle">

                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>

                                    <td>#{product.id}</td>

                                    <td>
                                        {product.image_url ? (
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                width="70"
                                                height="70"
                                                style={{
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>

                                    <td>{product.name}</td>

                                    <td>
                                        {product.category?.name || "N/A"}
                                    </td>

                                    <td>
                                        ${Number(product.price).toFixed(2)}
                                    </td>

                                    <td>{product.stock}</td>

                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() =>
                                                navigate(`/admin/products/edit/${product.id}`)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button 
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(product.id)}
                                        
                                        >
                                            Delete
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

export default AdminProducts;