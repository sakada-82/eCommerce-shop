import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Home() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
}, []);

const fetchProducts = async () => {
    try {
        const response = await api.get("/products");

        console.log("Products:", response.data);

        setProducts(response.data.data || []);
    } catch (error) {
        console.error(
            "Failed to load products:",
            error.response?.data || error
        );
    }
};

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");

      setCategories(response.data.data || []);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };
  return (
    <>
      {/* ================= SLIDER ================= */}
      <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
        {/* Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide-to="0"
            className="active"
          ></button>

          <button
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide-to="1"
          ></button>

          <button
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide-to="2"
          ></button>
        </div>

        <div className="carousel-inner">
          {/* Slide 1 */}
          <div
            className="carousel-item active bg-dark text-white"
            data-bs-interval="4000"
          >
            <div
              className="container d-flex align-items-center"
              style={{ minHeight: "500px" }}
            >
              <div className="col-lg-6">
                <p className="text-uppercase">New Collection</p>

                <h1 className="display-3 fw-bold">
                  Discover Your
                  <br />
                  Favorite Products
                </h1>

                <p className="lead mt-3">
                  Shop quality products at great prices with fast and reliable
                  service.
                </p>

                <Link to="/products" className="btn btn-primary btn-lg mt-3">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div
            className="carousel-item bg-secondary text-white"
            data-bs-interval="4000"
          >
            <div
              className="container d-flex align-items-center"
              style={{ minHeight: "500px" }}
            >
              <div className="col-lg-6">
                <p className="text-uppercase">Special Offer</p>

                <h1 className="display-3 fw-bold">
                  Best Deals
                  <br />
                  For You
                </h1>

                <p className="lead mt-3">
                  Find amazing deals on our latest products.
                </p>

                <Link to="/products" className="btn btn-light btn-lg mt-3">
                  Explore Products
                </Link>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div
            className="carousel-item bg-primary text-white"
            data-bs-interval="4000"
          >
            <div
              className="container d-flex align-items-center"
              style={{ minHeight: "500px" }}
            >
              <div className="col-lg-6">
                <p className="text-uppercase">Online Shopping</p>

                <h1 className="display-3 fw-bold">
                  Shop Easy.
                  <br />
                  Shop Smart.
                </h1>

                <p className="lead mt-3">
                  Browse categories and find everything you need in one place.
                </p>

                <Link to="/products" className="btn btn-dark btn-lg mt-3">
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Previous */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        {/* Next */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* ================= WELCOME ================= */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <p className="text-primary fw-bold">WELCOME TO OUR STORE</p>

          <h2 className="fw-bold">Everything You Need, All in One Place</h2>

          <p className="text-muted mx-auto mt-3" style={{ maxWidth: "650px" }}>
            Discover our collection of quality products and enjoy a simple and
            convenient online shopping experience.
          </p>

          <Link to="/products" className="btn btn-outline-dark mt-2">
            View All Products
          </Link>
        </div>
      </section>
      {/* ================= CATEGORIES ================= */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-primary fw-bold mb-2">SHOP BY CATEGORY</p>

            <h2 className="fw-bold">Browse Our Categories</h2>

            <p className="text-muted">
              Find the products you're looking for by category.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div className="col-md-4 col-lg-3" key={category.id}>
                  <div
                    className="card border-0 shadow-sm h-100 text-center"
                    style={{
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                    onClick={() =>
                      navigate(`/products?category=${category.id}`)
                    }
                  >
                    <div className="card-body py-5">
                      <div
                        className="mb-3"
                        style={{
                          fontSize: "45px",
                        }}
                      >
                        🛍️
                      </div>

                      <h5 className="fw-bold">{category.name}</h5>

                      <p className="text-muted mb-0">Explore Products</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <p className="text-muted">No categories available.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* ================= FEATURED PRODUCTS ================= */}
<section className="py-5">
    <div className="container">

        <div className="text-center mb-5">
            <p className="text-primary fw-bold mb-2">
                OUR PRODUCTS
            </p>

            <h2 className="fw-bold">
                Featured Products
            </h2>

            <p className="text-muted">
                Discover some of our latest products.
            </p>
        </div>

        <div className="row g-4">

            {products.length > 0 ? (
                products.slice(0, 8).map((product) => (

                    <div
                        className="col-md-6 col-lg-3"
                        key={product.id}
                    >
                        <div className="card border-0 shadow-sm h-100">

                            {product.image_url ? (
                                <img
                                    src={product.image_url}
                                    className="card-img-top"
                                    alt={product.name}
                                    style={{
                                        height: "220px",
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <div
                                    className="bg-light d-flex align-items-center justify-content-center"
                                    style={{ height: "220px" }}
                                >
                                    No Image
                                </div>
                            )}

                            <div className="card-body d-flex flex-column">

                                <small className="text-muted">
                                    {product.category?.name ||
                                        "Product"}
                                </small>

                                <h5 className="card-title fw-bold mt-1">
                                    {product.name}
                                </h5>

                                <h5 className="text-primary mt-auto">
                                    ${Number(product.price).toFixed(2)}
                                </h5>

                                <p className="text-muted mb-3">
                                    Stock: {product.stock}
                                </p>

                                <Link
                                    to={`/products/${product.id}`}
                                    className="btn btn-dark w-100"
                                >
                                    View Details
                                </Link>

                            </div>
                        </div>
                    </div>

                ))
            ) : (
                <div className="col-12 text-center">
                    <p className="text-muted">
                        No products available.
                    </p>
                </div>
            )}

        </div>

        <div className="text-center mt-5">
            <Link
                to="/products"
                className="btn btn-outline-dark px-4"
            >
                View All Products
            </Link>
        </div>

    </div>
</section>
    </>
  );
}

export default Home;
