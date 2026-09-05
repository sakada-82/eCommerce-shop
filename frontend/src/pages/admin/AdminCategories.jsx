import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function AdminCategories() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get("/categories");

            setCategories(response.data.data || []);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to load categories."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/categories/${id}`);

            alert("Category deleted successfully!");

            fetchCategories();
        } catch (err) {
            console.error(err);

            alert(
                err.response?.data?.message ||
                "Failed to delete category."
            );
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

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Categories</h2>

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        navigate("/admin/categories/add")
                    }
                >
                    + Add Category
                </button>
            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="card">
                <div className="card-body">

                    <table className="table table-bordered table-hover">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>

                                        <td>{category.name}</td>

                                        <td>
                                            {category.description || "-"}
                                        </td>

                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/categories/edit/${category.id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    handleDelete(category.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center"
                                    >
                                        No categories found.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>

                </div>
            </div>

        </div>
    );
}

export default AdminCategories;