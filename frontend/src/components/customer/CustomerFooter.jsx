import { Link } from "react-router-dom";

function CustomerFooter() {
    return (
        <footer className="bg-dark text-white mt-5 pt-5 pb-3">

            <div className="container">

                <div className="row">

                    <div className="col-md-4 mb-4">
                        <h4>🛒 E-Commerce</h4>

                        <p className="text-secondary">
                            Your trusted online shopping store.
                            Find quality products at great prices.
                        </p>
                    </div>

                    <div className="col-md-2 mb-4">
                        <h5>Quick Links</h5>

                        <div className="d-flex flex-column gap-2">
                            <Link
                                to="/"
                                className="text-secondary text-decoration-none"
                            >
                                Home
                            </Link>

                            <Link
                                to="/about"
                                className="text-secondary text-decoration-none"
                            >
                                About
                            </Link>

                            <Link
                                to="/contact"
                                className="text-secondary text-decoration-none"
                            >
                                Contact
                            </Link>

                            <Link
                                to="/products"
                                className="text-secondary text-decoration-none"
                            >
                                Products
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-3 mb-4">
                        <h5>Customer</h5>

                        <div className="d-flex flex-column gap-2">

                            <Link
                                to="/cart"
                                className="text-secondary text-decoration-none"
                            >
                                Cart
                            </Link>

                            <Link
                                to="/orders"
                                className="text-secondary text-decoration-none"
                            >
                                My Orders
                            </Link>

                            <Link
                                to="/login"
                                className="text-secondary text-decoration-none"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="text-secondary text-decoration-none"
                            >
                                Register
                            </Link>

                        </div>
                    </div>

                    <div className="col-md-3 mb-4">
                        <h5>Contact</h5>

                        <p className="text-secondary mb-2">
                            📧 ecommerce@gmail.com
                        </p>

                        <p className="text-secondary mb-2">
                            📞 +855 12 345 678
                        </p>

                        <p className="text-secondary">
                            📍 Phnom Penh, Cambodia
                        </p>
                    </div>

                </div>

                <hr className="border-secondary" />

                <p className="text-center text-secondary mb-0">
                    © 2026 E-Commerce. All rights reserved.
                </p>

            </div>

        </footer>
    );
}

export default CustomerFooter;