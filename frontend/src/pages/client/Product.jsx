import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate, useSearchParams } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get("category");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Search + Category Filter
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      !categoryId || String(product.category_id) === String(categoryId);

    return matchSearch && matchCategory;
  });

  return (
    <div className="container py-4">
      <h2 className="mb-4">Products</h2>

      {/* Search + Category */}
      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Cards */}
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-4 col-lg-3 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.image_url}
                className="card-img-top"
                alt={product.name}
                style={{
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>

                <p
                  className="card-text text-muted"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    minHeight: "48px",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {product.description}
                </p>

                <div className="mt-auto">
                  <h5>${product.price}</h5>

                  <p>Stock: {product.stock}</p>

                  <button
                    className="btn btn-primary w-100"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Product */}
      {filteredProducts.length === 0 && (
        <div className="text-center mt-5">
          <h5>No products found</h5>
        </div>
      )}
    </div>
  );
}

export default Product;
