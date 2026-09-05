import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

function AdminCustomers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await api.get("/admin/customers");

            setCustomers(response.data.data || []);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to load customers."
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container py-5">
                Loading customers...
            </div>
        );
    }

    return (
        <div className="container py-5">

            <h2 className="mb-4">
                Customers 👥
            </h2>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="card">
                <div className="card-body">

                    <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle">

                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Orders</th>
                                    <th>Registered</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {customers.length > 0 ? (
                                    customers.map((customer) => (
                                        <tr key={customer.id}>

                                            <td>
                                                #{customer.id}
                                            </td>

                                            <td>
                                                {customer.name}
                                            </td>

                                            <td>
                                                {customer.email}
                                            </td>

                                            <td>
                                                <span className="badge bg-primary">
                                                    {customer.orders_count}
                                                </span>
                                            </td>

                                            <td>
                                                {new Date(
                                                    customer.created_at
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() =>
                                                        navigate(`/admin/customers/${customer.id}`)
                                                    }
                                                >
                                                    View
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center"
                                        >
                                            No customers found.
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default AdminCustomers;