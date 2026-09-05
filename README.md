# E-Commerce Management System

E-Commerce Management System is a web application developed using Laravel REST API and React.js.

The system supports two user roles:

- Admin
- Customer

## Technologies

### Backend
- Laravel 10
- PHP
- Laravel Sanctum
- MySQL
- REST API

### Frontend
- React.js
- Vite
- React Router
- Axios
- Bootstrap
- Chart.js

## Features

### Customer
- Register and Login
- Browse Products
- Browse Categories
- Search Products
- View Product Details
- Add Products to Cart
- Update Cart Quantity
- Remove Products from Cart
- Checkout
- View Orders
- View Order Details
- Cancel Pending Orders
- Automatic Stock Restore After Cancellation

### Admin
- Admin Dashboard
- Dashboard Statistics
- Sales Chart
- Manage Categories
- Manage Products
- Upload Product Images
- Manage Customers
- Manage Orders
- Update Order Status
- View Order Details

## Order Status

The order flow is:

Pending → Confirmed → Shipped → Delivered

Pending orders can also be cancelled.

## Installation

### 1. Clone Project

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Project-final
```

### 2. Install Laravel Dependencies

```bash
composer install
```

### 3. Create Environment File

Copy:

```text
.env.example
```

to:

```text
.env
```

Then configure your database:

```env
DB_DATABASE=ecommerce_db
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Generate Application Key

```bash
php artisan key:generate
```

### 5. Run Database Migration

```bash
php artisan migrate
```

If the project uses seeders:

```bash
php artisan db:seed
```

### 6. Create Storage Link

```bash
php artisan storage:link
```

### 7. Start Laravel Server

```bash
php artisan serve
```

Laravel API:

```text
http://127.0.0.1:8000
```

## Frontend Setup

Open the frontend folder:

```bash
cd frontend
```

Install packages:

```bash
npm install
```

Start React:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

## API Authentication

This project uses Laravel Sanctum token authentication.

Protected API requests use:

```text
Authorization: Bearer TOKEN
```

## User Roles

### Admin
Admin can access the admin dashboard and management features.

### Customer
Customer can access shopping, cart, checkout, and order features.

## Project Structure

```text
Project-final/
│
├── app/
├── database/
├── routes/
├── storage/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   └── pages/
│   └── package.json
│
├── .env.example
├── artisan
├── composer.json
└── README.md
```

## Developer

Developed as a Laravel + React E-Commerce Final Project.