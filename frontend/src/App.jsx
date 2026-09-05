import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";

// Customer
import Product from "./pages/client/Product";
import ProductDetail from "./pages/client/ProductDetail";
import Cart from "./pages/client/Cart";
import Checkout from "./pages/client/Checkout";
import Orders from "./pages/client/Orders";
import OrderDetail from "./pages/client/OrderDetail";
import Home from "./pages/client/Home";
import About from "./pages/client/About";
import Contact from "./pages/client/Contact";
import Categories from "./pages/client/Categories";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";

import AdminCategories from "./pages/admin/AdminCategories";
import AddCategory from "./pages/admin/AddCategory";
import EditCategory from "./pages/admin/EditCategory";

import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";

import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminCustomerDetail from "./pages/admin/AdminCustomerDetail";


function CustomerDashboard() {
    return (
        <div className="container py-5">
            <h1>Customer Dashboard</h1>
        </div>
    );
}


function Unauthorized() {
    return (
        <div className="container py-5 text-center">
            <h1>403 - Unauthorized</h1>
        </div>
    );
}


function App() {
    return (
        <BrowserRouter>

            <Routes>
                {/* Login */}
                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    {/* Register */}
                    <Route
                        path="/register"
                        element={<Register />}
                    />

                {/* ================================= */}
                {/* CUSTOMER / PUBLIC */}
                {/* ================================= */}

                <Route element={<CustomerLayout />}>

                    {/* Temporary Home */}
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/about"
                        element={<About />}
                    />
                    <Route
                        path="/contact"
                        element={<Contact />}
                    />
                    <Route
                        path="/categories"
                        element={<Categories />}
                    />

                    {/* Products */}
                    <Route
                        path="/products"
                        element={<Product />}
                    />

                    <Route
                        path="/products/:id"
                        element={<ProductDetail />}
                    />

                    

                    {/* Customer Dashboard */}
                    <Route
                        path="/customer/dashboard"
                        element={
                            <ProtectedRoute
                                allowedRoles={["customer"]}
                            >
                                <CustomerDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Cart */}
                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute
                                allowedRoles={["customer"]}
                            >
                                <Cart />
                            </ProtectedRoute>
                        }
                    />

                    {/* Checkout */}
                    <Route
                        path="/checkout"
                        element={
                            <ProtectedRoute
                                allowedRoles={["customer"]}
                            >
                                <Checkout />
                            </ProtectedRoute>
                        }
                    />

                    {/* Orders */}
                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute
                                allowedRoles={["customer"]}
                            >
                                <Orders />
                            </ProtectedRoute>
                        }
                    />

                    {/* Order Detail */}
                    <Route
                        path="/orders/:id"
                        element={
                            <ProtectedRoute
                                allowedRoles={["customer"]}
                            >
                                <OrderDetail />
                            </ProtectedRoute>
                        }
                    />

                    {/* Unauthorized */}
                    <Route
                        path="/unauthorized"
                        element={<Unauthorized />}
                    />

                </Route>


                {/* ================================= */}
                {/* ADMIN */}
                {/* ================================= */}

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute
                            allowedRoles={["admin"]}
                        >
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >

                    {/* Dashboard */}
                    <Route
                        path="dashboard"
                        element={<AdminDashboard />}
                    />

                    {/* Products */}
                    <Route
                        path="products"
                        element={<AdminProducts />}
                    />

                    <Route
                        path="products/add"
                        element={<AddProduct />}
                    />

                    <Route
                        path="products/edit/:id"
                        element={<EditProduct />}
                    />

                    {/* Categories */}
                    <Route
                        path="categories"
                        element={<AdminCategories />}
                    />

                    <Route
                        path="categories/add"
                        element={<AddCategory />}
                    />

                    <Route
                        path="categories/edit/:id"
                        element={<EditCategory />}
                    />

                    {/* Orders */}
                    <Route
                        path="orders"
                        element={<AdminOrders />}
                    />

                    <Route
                        path="orders/:id"
                        element={<AdminOrderDetail />}
                    />

                    {/* Customers */}
                    <Route
                        path="customers"
                        element={<AdminCustomers />}
                    />

                    <Route
                        path="customers/:id"
                        element={<AdminCustomerDetail />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;