import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function AdminDashboard() {
  const [stats, setStats] = useState({
    total_products: 0,
    total_customers: 0,
    total_orders: 0,
    total_sales: 0,
    recent_orders: [],
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await api.get("/admin/dashboard/stats");

      setStats(response.data.data);
    } catch (error) {
      console.error("Dashboard stats error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Statistics Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-xl-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-2">Total Products</p>

              <h2>{stats.total_products}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-2">Total Customers</p>

              <h2>{stats.total_customers}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-2">Total Orders</p>

              <h2>{stats.total_orders}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-2">Total Sales</p>

              <h2>${Number(stats.total_sales).toFixed(2)}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Recent Orders */}
      <div className="row g-4">
        {/* Monthly Sales */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">📊 Monthly Sales</h5>
            </div>

            <div className="card-body">
              {stats.monthly_sales?.length > 0 ? (
                <Bar
                  data={{
                    labels: stats.monthly_sales.map(
                      (item) => `Month ${item.month}`,
                    ),

                    datasets: [
                      {
                        label: "Sales ($)",

                        data: stats.monthly_sales.map((item) =>
                          Number(item.total),
                        ),
                      },
                    ],
                  }}
                  options={{
                    responsive: true,

                    maintainAspectRatio: false,

                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              ) : (
                <p className="text-center text-muted">No sales data.</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">📦 Recent Orders</h5>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate("/admin/orders")}
              >
                View All
              </button>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {stats.recent_orders?.map((order) => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>

                        <td>{order.user?.name || "-"}</td>

                        <td>${Number(order.total_amount).toFixed(2)}</td>

                        <td>
                          <span
                            className={`badge ${
                              order.status === "delivered"
                                ? "bg-success"
                                : order.status === "cancelled"
                                  ? "bg-danger"
                                  : order.status === "pending"
                                    ? "bg-warning text-dark"
                                    : order.status === "shipped"
                                      ? "bg-info text-dark"
                                      : "bg-primary"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>

                        <td>
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
