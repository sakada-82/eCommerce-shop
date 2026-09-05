import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get("/categories");

            setCategories(response.data.data || []);
        } catch (error) {
            console.error(
                "Failed to load categories:",
                error.response?.data || error
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Header */}
            <section className="bg-dark text-white py-5">
                <div className="container text-center py-4">

                    <h1 className="fw-bold">
                        Categories
                    </h1>

                    <p className="mb-0">
                        Browse products by category
                    </p>

                </div>
            </section>


            {/* Categories */}
            <section className="py-5">

                <div className="container">

                    <div className="text-center mb-5">

                        <p className="text-primary fw-bold mb-2">
                            SHOP BY CATEGORY
                        </p>

                        <h2 className="fw-bold">
                            All Categories
                        </h2>

                        <p className="text-muted">
                            Choose a category to explore products.
                        </p>

                    </div>


                    {loading ? (

                        <div className="text-center py-5">
                            <div
                                className="spinner-border text-primary"
                                role="status"
                            ></div>

                            <p className="text-muted mt-3">
                                Loading categories...
                            </p>
                        </div>

                    ) : categories.length > 0 ? (

                        <div className="row g-4">

                            {categories.map((category) => (

                                <div
                                    className="col-md-6 col-lg-4"
                                    key={category.id}
                                >
                                    <div
                                        className="card border-0 shadow-sm h-100"
                                        style={{
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            navigate(
                                                `/products?category=${category.id}`
                                            )
                                        }
                                    >
                                        <div className="card-body p-4 text-center">

                                            <div
                                                className="mb-3"
                                                style={{
                                                    fontSize: "55px",
                                                }}
                                            >
                                                🛍️
                                            </div>

                                            <h4 className="fw-bold">
                                                {category.name}
                                            </h4>

                                            <p className="text-muted">
                                                Explore our collection
                                            </p>

                                            <span className="badge bg-primary px-3 py-2">
                                                {category.products_count || 0}
                                                {" "}
                                                Products
                                            </span>

                                            <div className="mt-4">

                                                <button
                                                    className="btn btn-outline-dark"
                                                    onClick={(e) => {
                                                        e.stopPropagation();

                                                        navigate(
                                                            `/products?category=${category.id}`
                                                        );
                                                    }}
                                                >
                                                    View Products
                                                </button>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                            ))}

                        </div>

                    ) : (

                        <div className="text-center py-5">

                            <h5>
                                No categories available.
                            </h5>

                            <p className="text-muted">
                                Categories will appear here.
                            </p>

                        </div>

                    )}

                </div>

            </section>
        </>
    );
}

export default Categories;