import { useState } from "react";

function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Message sent successfully!");

        setForm({
            name: "",
            email: "",
            message: "",
        });
    };

    return (
        <>
            {/* Header */}
            <section className="bg-dark text-white py-5">
                <div className="container text-center py-4">
                    <h1 className="fw-bold">
                        Contact Us
                    </h1>

                    <p className="mb-0">
                        We'd love to hear from you
                    </p>
                </div>
            </section>

            {/* Contact */}
            <section className="py-5">
                <div className="container">

                    <div className="row g-5">

                        {/* Contact Information */}
                        <div className="col-md-5">

                            <p className="text-primary fw-bold">
                                GET IN TOUCH
                            </p>

                            <h2 className="fw-bold mb-4">
                                Contact Information
                            </h2>

                            <div className="mb-4">
                                <h5>📍 Address</h5>

                                <p className="text-muted">
                                    Phnom Penh, Cambodia
                                </p>
                            </div>

                            <div className="mb-4">
                                <h5>📞 Phone</h5>

                                <p className="text-muted">
                                    +855 12 345 678
                                </p>
                            </div>

                            <div className="mb-4">
                                <h5>📧 Email</h5>

                                <p className="text-muted">
                                    ecommerce@gmail.com
                                </p>
                            </div>

                            <div>
                                <h5>🕒 Working Hours</h5>

                                <p className="text-muted">
                                    Monday - Saturday
                                    <br />
                                    8:00 AM - 6:00 PM
                                </p>
                            </div>

                        </div>


                        {/* Contact Form */}
                        <div className="col-md-7">

                            <div className="card border-0 shadow-sm">

                                <div className="card-body p-4">

                                    <h3 className="fw-bold mb-4">
                                        Send Us a Message
                                    </h3>

                                    <form onSubmit={handleSubmit}>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Name
                                            </label>

                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="Enter your name"
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Email
                                            </label>

                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Message
                                            </label>

                                            <textarea
                                                name="message"
                                                className="form-control"
                                                rows="6"
                                                value={form.message}
                                                onChange={handleChange}
                                                placeholder="Write your message..."
                                                required
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary px-4"
                                        >
                                            Send Message
                                        </button>

                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>
        </>
    );
}

export default Contact;