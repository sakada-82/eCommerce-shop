import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function AddCategory() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await api.post("/categories", {
                name: form.name,
                description: form.description,
            });

            alert("Category added successfully!");

            navigate("/admin/categories");
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
                    "Failed to add category."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">

            <h2>Add Category</h2>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">
                        Category Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter category name"
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
                        placeholder="Enter category description"
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Category"}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() =>
                        navigate("/admin/categories")
                    }
                >
                    Cancel
                </button>

            </form>
        </div>
    );
}

export default AddCategory;