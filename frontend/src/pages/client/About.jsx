import { Link } from "react-router-dom";

function About() {
    return (
        <>
            {/* Header */}
            <section className="bg-dark text-white py-5">
                <div className="container text-center py-4">
                    <h1 className="fw-bold">About Us</h1>

                    <p className="text-light mb-0">
                        Learn more about our E-Commerce store
                    </p>
                </div>
            </section>

            {/* About */}
            <section className="py-5">
                <div className="container">

                    <div className="row align-items-center g-5">

                        <div className="col-md-6">
                            <div
                                className="bg-light rounded d-flex align-items-center justify-content-center"
                                style={{ minHeight: "350px" }}
                            >
                                <div className="text-center">
                                    <div style={{ fontSize: "90px" }}>
                                        🛒
                                    </div>

                                    <h3 className="fw-bold">
                                        E-Commerce
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">

                            <p className="text-primary fw-bold">
                                WHO WE ARE
                            </p>

                            <h2 className="fw-bold mb-3">
                                Your Trusted Online Shopping Store
                            </h2>

                            <p className="text-muted">
                                We provide a simple and convenient
                                online shopping experience where
                                customers can browse products,
                                explore categories and place orders
                                easily.
                            </p>

                            <p className="text-muted">
                                Our goal is to provide quality
                                products, reliable service and a
                                smooth shopping experience for every
                                customer.
                            </p>

                            <Link
                                to="/products"
                                className="btn btn-primary mt-2"
                            >
                                Shop Now
                            </Link>

                        </div>

                    </div>

                </div>
            </section>

            {/* Features */}
            <section className="bg-light py-5">
                <div className="container">

                    <div className="text-center mb-5">
                        <h2 className="fw-bold">
                            Why Choose Us?
                        </h2>
                    </div>

                    <div className="row g-4">

                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 text-center">
                                <div className="card-body p-4">
                                    <div
                                        className="mb-3"
                                        style={{ fontSize: "45px" }}
                                    >
                                        ⭐
                                    </div>

                                    <h5 className="fw-bold">
                                        Quality Products
                                    </h5>

                                    <p className="text-muted mb-0">
                                        We provide quality products
                                        for our customers.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 text-center">
                                <div className="card-body p-4">
                                    <div
                                        className="mb-3"
                                        style={{ fontSize: "45px" }}
                                    >
                                        🚚
                                    </div>

                                    <h5 className="fw-bold">
                                        Fast Service
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Simple ordering and reliable
                                        customer service.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 text-center">
                                <div className="card-body p-4">
                                    <div
                                        className="mb-3"
                                        style={{ fontSize: "45px" }}
                                    >
                                        🔒
                                    </div>

                                    <h5 className="fw-bold">
                                        Secure Shopping
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Shop with a simple and secure
                                        account system.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </>
    );
}

export default About;