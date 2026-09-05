import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        category_id: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        image: null,
    });

    const [oldImage, setOldImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProduct();
        fetchCategories();
    }, [id]);

    const fetchCategories = async () => {
        try {
            const response = await api.get("/categories");

            setCategories(response.data.data || []);
        } catch (err) {
            console.error(err);
            setError("Failed to load categories.");
        }
    };

    const fetchProduct = async () => {
        try {
            const response = await api.get(`/products/${id}`);

            const product = response.data.data;

            setForm({
                category_id: product.category_id || "",
                name: product.name || "",
                description: product.description || "",
                price: product.price || "",
                stock: product.stock || "",
                image: null,
            });

            setOldImage(product.image_url);
        } catch (err) {
            console.error(err);
            setError("Failed to load product.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setError("");

        try {
            const formData = new FormData();

            formData.append("category_id", form.category_id);
            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("price", form.price);
            formData.append("stock", form.stock);

            if (form.image) {
                formData.append("image", form.image);
            }

            // Laravel PUT + multipart/form-data
            formData.append("_method", "PUT");

            await api.post(`/products/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Product updated successfully!");

            navigate("/admin/products");
        } catch (err) {
            console.error(err);

            if (err.response?.data?.errors) {
                setError(
                    Object.values(err.response.data.errors)
                        .flat()
                        .join(" ")
                );
            } else {
                setError(
                    err.response?.data?.message ||
                    "Failed to update product."
                );
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="container mt-4">Loading...</div>;
    }

    return (
        <div className="container mt-4">

            <h2>Edit Product</h2>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">
                        Category ID
                    </label>

                    <select
                        name="category_id"
                        className="form-select"
                        value={form.category_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Category --</option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Product Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Description
                    </label>

                    <textarea
                        name="description"
                        className="form-control"
                        rows="4"
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Price
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        className="form-control"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Stock
                    </label>

                    <input
                        type="number"
                        name="stock"
                        className="form-control"
                        value={form.stock}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Old Image */}
                {oldImage && (
                    <div className="mb-3">
                        <label className="form-label">
                            Current Image
                        </label>

                        <br />

                        <img
                            src={oldImage}
                            alt="Current"
                            width="150"
                            height="150"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                )}

                {/* New Image */}
                <div className="mb-3">
                    <label className="form-label">
                        Change Image
                    </label>

                    <input
                        type="file"
                        name="image"
                        className="form-control"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                >
                    {saving ? "Updating..." : "Update Product"}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate("/admin/products")}
                >
                    Cancel
                </button>

            </form>
        </div>
    );
}

export default EditProduct;