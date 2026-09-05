import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

function EditCategory() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCategory();
    }, [id]);

    const fetchCategory = async () => {
        try {
            const response = await api.get(`/categories/${id}`);

            const category = response.data.data;

            setForm({
                name: category.name || "",
                description: category.description || "",
            });
        } catch (err) {
            console.error(err);
            setError("Failed to load category.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setError("");

        try {
            await api.put(`/categories/${id}`, {
                name: form.name,
                description: form.description,
            });

            alert("Category updated successfully!");

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
                    "Failed to update category."
                );
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="container mt-4">
                Loading...
            </div>
        );
    }

    return (
        <div className="container mt-4">

            <h2>Edit Category</h2>

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

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                >
                    {saving ? "Updating..." : "Update Category"}
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

export default EditCategory;